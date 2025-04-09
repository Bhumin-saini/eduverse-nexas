
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

/**
 * @title EduPointsToken
 * @dev ERC20 token for the EDUChain education ecosystem
 * Layer 3 solution built on Arbitrum
 */
contract EduPointsToken is ERC20, ERC20Burnable, Pausable, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    bytes32 public constant DAO_ROLE = keccak256("DAO_ROLE");
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    // Define achievement types
    enum AchievementType { ACADEMIC, SKILLS, LEADERSHIP, COMMUNITY }
    
    // Achievement structure
    struct Achievement {
        AchievementType achievementType;
        uint256 pointsAwarded;
        string achievementName;
        uint256 timestamp;
    }
    
    // Student account structure
    struct StudentAccount {
        bool isRegistered;
        uint256 totalPointsEarned;
        uint256 totalPointsSpent;
        uint256 stakedPoints;
        uint256 stakeTimestamp;
        uint256 stakeEndTime;
        mapping(uint256 => Achievement) achievements;
        uint256 achievementCount;
    }
    
    // Campus service offers
    struct CampusOffer {
        string offerName;
        uint256 pointsCost;
        bool isActive;
    }
    
    // Total supply configuration
    uint256 private constant MAX_SUPPLY = 100000000 * 10**18; // 100 million tokens
    uint256 private constant STUDENT_POOL_ALLOCATION = 45000000 * 10**18; // 45 million tokens
    uint256 private constant DAO_TREASURY_ALLOCATION = 30500000 * 10**18; // 30.5 million tokens
    
    // Track student accounts
    mapping(address => StudentAccount) public studentAccounts;
    
    // Campus offers
    CampusOffer[] public campusOffers;
    
    // Staking APY rates (basis points: 500 = 5%, 1000 = 10%, 1500 = 15%)
    uint256 public oneMonthStakingRate = 500;
    uint256 public threeMonthStakingRate = 1000;
    uint256 public academicYearStakingRate = 1500;

    // Events
    event PointsEarned(address indexed student, uint256 amount, string achievementName, AchievementType achievementType);
    event PointsRedeemed(address indexed student, uint256 amount, string offerName);
    event PointsStaked(address indexed student, uint256 amount, uint256 duration);
    event PointsUnstaked(address indexed student, uint256 amount, uint256 reward);
    event NewOfferAdded(string offerName, uint256 pointsCost);
    event StudentRegistered(address indexed studentAddress);

    /**
     * @dev Constructor initializes the EduPoints token with initial allocations
     */
    constructor() ERC20("EduPoints", "EDU") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        _grantRole(PAUSER_ROLE, msg.sender);
        _grantRole(DAO_ROLE, msg.sender);
        
        // Mint initial supply
        _mint(address(this), MAX_SUPPLY);
        
        // Allocate to DAO treasury
        _transfer(address(this), msg.sender, DAO_TREASURY_ALLOCATION);
        
        // Create initial campus offers
        campusOffers.push(CampusOffer("10% Cafeteria Discount", 100 * 10**18, true));
        campusOffers.push(CampusOffer("Bookstore Coupon", 200 * 10**18, true));
        campusOffers.push(CampusOffer("Printing Credits", 50 * 10**18, true));
        campusOffers.push(CampusOffer("Early Course Registration", 300 * 10**18, true));
        campusOffers.push(CampusOffer("Study Room Reservation", 75 * 10**18, true));
    }

    /**
     * @dev Register a new student
     * @param studentAddress Address of the student to register
     */
    function registerStudent(address studentAddress) external onlyRole(ADMIN_ROLE) {
        require(!studentAccounts[studentAddress].isRegistered, "Student already registered");
        
        StudentAccount storage newStudent = studentAccounts[studentAddress];
        newStudent.isRegistered = true;
        newStudent.totalPointsEarned = 0;
        newStudent.totalPointsSpent = 0;
        newStudent.stakedPoints = 0;
        
        emit StudentRegistered(studentAddress);
    }

    /**
     * @dev Award points to a student for an achievement
     * @param studentAddress Address of the student to award points to
     * @param points Amount of points to award
     * @param achievementName Name of the achievement
     * @param achievementType Type of achievement (0=Academic, 1=Skills, 2=Leadership, 3=Community)
     */
    function awardPoints(
        address studentAddress, 
        uint256 points, 
        string calldata achievementName,
        AchievementType achievementType
    ) external onlyRole(MINTER_ROLE) whenNotPaused {
        require(studentAccounts[studentAddress].isRegistered, "Student not registered");
        require(points > 0, "Points must be greater than zero");
        require(balanceOf(address(this)) >= points, "Insufficient points in student pool");
        
        // Transfer points from contract to student
        _transfer(address(this), studentAddress, points);
        
        // Record achievement
        StudentAccount storage student = studentAccounts[studentAddress];
        uint256 achievementId = student.achievementCount;
        student.achievements[achievementId] = Achievement({
            achievementType: achievementType,
            pointsAwarded: points,
            achievementName: achievementName,
            timestamp: block.timestamp
        });
        student.achievementCount++;
        student.totalPointsEarned += points;
        
        emit PointsEarned(studentAddress, points, achievementName, achievementType);
    }

    /**
     * @dev Allow a student to redeem points for a campus offer
     * @param offerId ID of the offer to redeem
     */
    function redeemOffer(uint256 offerId) external whenNotPaused {
        require(studentAccounts[msg.sender].isRegistered, "Student not registered");
        require(offerId < campusOffers.length, "Invalid offer ID");
        require(campusOffers[offerId].isActive, "Offer is not active");
        
        CampusOffer memory offer = campusOffers[offerId];
        require(balanceOf(msg.sender) >= offer.pointsCost, "Insufficient points");
        
        // Burn points
        _burn(msg.sender, offer.pointsCost);
        
        // Update student records
        studentAccounts[msg.sender].totalPointsSpent += offer.pointsCost;
        
        emit PointsRedeemed(msg.sender, offer.pointsCost, offer.offerName);
    }

    /**
     * @dev Allow a student to stake their points
     * @param amount Amount of points to stake
     * @param durationMonths Duration in months (1, 3, or 9 for academic year)
     */
    function stakePoints(uint256 amount, uint256 durationMonths) external whenNotPaused {
        require(studentAccounts[msg.sender].isRegistered, "Student not registered");
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");
        require(durationMonths == 1 || durationMonths == 3 || durationMonths == 9, "Invalid duration");
        require(studentAccounts[msg.sender].stakedPoints == 0, "Already has active stake");
        
        uint256 durationSeconds = durationMonths * 30 days;
        
        // Transfer points from student to contract
        _transfer(msg.sender, address(this), amount);
        
        // Record stake
        StudentAccount storage student = studentAccounts[msg.sender];
        student.stakedPoints = amount;
        student.stakeTimestamp = block.timestamp;
        student.stakeEndTime = block.timestamp + durationSeconds;
        
        emit PointsStaked(msg.sender, amount, durationMonths);
    }

    /**
     * @dev Allow a student to unstake their points and claim rewards
     */
    function unstakePoints() external whenNotPaused {
        StudentAccount storage student = studentAccounts[msg.sender];
        require(student.isRegistered, "Student not registered");
        require(student.stakedPoints > 0, "No active stake");
        
        uint256 stakedAmount = student.stakedPoints;
        uint256 stakeDuration = block.timestamp - student.stakeTimestamp;
        uint256 reward = 0;
        
        // Calculate reward based on staking duration and rate
        if (stakeDuration >= (student.stakeEndTime - student.stakeTimestamp)) {
            // Full term completed
            uint256 durationInMonths = (student.stakeEndTime - student.stakeTimestamp) / (30 days);
            
            if (durationInMonths == 1) {
                reward = (stakedAmount * oneMonthStakingRate) / 10000;
            } else if (durationInMonths == 3) {
                reward = (stakedAmount * threeMonthStakingRate) / 10000;
            } else if (durationInMonths == 9) {
                reward = (stakedAmount * academicYearStakingRate) / 10000;
            }
        } else {
            // Early withdrawal - reduced rewards
            reward = (stakedAmount * 100) / 10000; // 1% minimum reward
        }
        
        // Reset staking data
        student.stakedPoints = 0;
        student.stakeTimestamp = 0;
        student.stakeEndTime = 0;
        
        // Return principal plus rewards
        _transfer(address(this), msg.sender, stakedAmount + reward);
        
        emit PointsUnstaked(msg.sender, stakedAmount, reward);
    }

    /**
     * @dev Add a new campus offer
     * @param offerName Name of the offer
     * @param pointsCost Cost in points
     */
    function addCampusOffer(string calldata offerName, uint256 pointsCost) external onlyRole(ADMIN_ROLE) {
        campusOffers.push(CampusOffer(offerName, pointsCost, true));
        emit NewOfferAdded(offerName, pointsCost);
    }

    /**
     * @dev Toggle an offer's active status
     * @param offerId ID of the offer to toggle
     */
    function toggleOfferStatus(uint256 offerId) external onlyRole(ADMIN_ROLE) {
        require(offerId < campusOffers.length, "Invalid offer ID");
        campusOffers[offerId].isActive = !campusOffers[offerId].isActive;
    }

    /**
     * @dev Update staking rates
     * @param oneMonth One month rate in basis points (e.g., 500 = 5%)
     * @param threeMonths Three month rate in basis points
     * @param academicYear Academic year rate in basis points
     */
    function updateStakingRates(
        uint256 oneMonth, 
        uint256 threeMonths, 
        uint256 academicYear
    ) external onlyRole(DAO_ROLE) {
        oneMonthStakingRate = oneMonth;
        threeMonthStakingRate = threeMonths;
        academicYearStakingRate = academicYear;
    }

    /**
     * @dev Get a student's achievement details
     * @param studentAddress Address of the student
     * @param achievementId ID of the achievement
     * @return achievementType Type of achievement
     * @return pointsAwarded Points awarded
     * @return achievementName Name of achievement
     * @return timestamp Time when achievement was recorded
     */
    function getStudentAchievement(
        address studentAddress, 
        uint256 achievementId
    ) external view returns (
        AchievementType achievementType,
        uint256 pointsAwarded,
        string memory achievementName,
        uint256 timestamp
    ) {
        require(studentAccounts[studentAddress].isRegistered, "Student not registered");
        require(achievementId < studentAccounts[studentAddress].achievementCount, "Invalid achievement ID");
        
        Achievement memory achievement = studentAccounts[studentAddress].achievements[achievementId];
        return (
            achievement.achievementType,
            achievement.pointsAwarded,
            achievement.achievementName,
            achievement.timestamp
        );
    }

    /**
     * @dev Get a student's account summary
     * @param studentAddress Address of the student
     * @return isRegistered Whether student is registered
     * @return totalPointsEarned Total points earned
     * @return totalPointsSpent Total points spent
     * @return currentBalance Current token balance
     * @return stakedPoints Currently staked points
     * @return achievementCount Number of achievements
     */
    function getStudentSummary(
        address studentAddress
    ) external view returns (
        bool isRegistered,
        uint256 totalPointsEarned,
        uint256 totalPointsSpent,
        uint256 currentBalance,
        uint256 stakedPoints,
        uint256 achievementCount
    ) {
        StudentAccount storage student = studentAccounts[studentAddress];
        return (
            student.isRegistered,
            student.totalPointsEarned,
            student.totalPointsSpent,
            balanceOf(studentAddress),
            student.stakedPoints,
            student.achievementCount
        );
    }

    /**
     * @dev Pause token transfers
     */
    function pause() external onlyRole(PAUSER_ROLE) {
        _pause();
    }

    /**
     * @dev Unpause token transfers
     */
    function unpause() external onlyRole(PAUSER_ROLE) {
        _unpause();
    }

    /**
     * @dev Override to add pause functionality
     */
    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal
        whenNotPaused
        override
    {
        super._beforeTokenTransfer(from, to, amount);
    }
}
