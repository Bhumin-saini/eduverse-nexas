import { ethers } from 'ethers';
import { hashPassword, verifyPassword } from '@/utils/auth';
import { db } from '@/lib/db';

export async function checkWalletRegistration(address: string) {
  try {
    const user = await db.user.findUnique({
      where: { walletAddress: address.toLowerCase() }
    });

    return {
      isRegistered: !!user,
      email: user?.email
    };
  } catch (error) {
    console.error('Error checking wallet registration:', error);
    throw new Error('Failed to check wallet registration');
  }
}

export async function registerWallet(address: string, email: string, password: string) {
  try {
    // Check if wallet is already registered
    const existingUser = await db.user.findUnique({
      where: { walletAddress: address.toLowerCase() }
    });

    if (existingUser) {
      throw new Error('Wallet is already registered');
    }

    // Check if email is already in use
    const existingEmail = await db.user.findUnique({
      where: { email }
    });

    if (existingEmail) {
      throw new Error('Email is already in use');
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    await db.user.create({
      data: {
        email,
        password: hashedPassword,
        walletAddress: address.toLowerCase(),
        isWalletRegistered: true
      }
    });

    return { success: true };
  } catch (error) {
    console.error('Error registering wallet:', error);
    throw error;
  }
}

export async function verifyWalletSignature(address: string, signature: string) {
  try {
    const message = 'Please sign this message to verify your wallet ownership';
    const recoveredAddress = ethers.verifyMessage(message, signature);

    if (recoveredAddress.toLowerCase() !== address.toLowerCase()) {
      throw new Error('Invalid signature');
    }

    return { isValid: true };
  } catch (error) {
    console.error('Error verifying wallet signature:', error);
    throw new Error('Failed to verify wallet signature');
  }
}

export async function loginWithWallet(address: string, signature: string) {
  try {
    // Verify signature
    await verifyWalletSignature(address, signature);

    // Get user
    const user = await db.user.findUnique({
      where: { walletAddress: address.toLowerCase() }
    });

    if (!user) {
      throw new Error('Wallet not registered');
    }

    return {
      email: user.email,
      walletAddress: user.walletAddress,
      isWalletRegistered: user.isWalletRegistered
    };
  } catch (error) {
    console.error('Error logging in with wallet:', error);
    throw error;
  }
} 