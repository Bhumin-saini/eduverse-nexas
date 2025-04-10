import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Wallet, AlertTriangle, CheckCircle, Loader2 } from 'lucide-react';
import { useToken } from '@/context/TokenContext';
import { useToast } from '@/hooks/use-toast';

// Define the validation schema
const registerFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  studentId: z.string()
    .min(5, { message: "Student ID must be at least 5 characters." })
    .regex(/^[A-Za-z0-9-]+$/, { message: "Student ID can only contain letters, numbers, and hyphens." }),
  department: z.string({
    required_error: "Please select a department.",
  })
});

type RegisterFormValues = z.infer<typeof registerFormSchema>;

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isConnected, connectWallet, registerStudent, isRegistered, isLoading } = useToken();
  const [registrationStep, setRegistrationStep] = useState<'connect' | 'register' | 'success'>(
    isConnected ? 'register' : 'connect'
  );

  // Initialize the form
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      studentId: "",
      department: ""
    }
  });

  // Handle wallet connection
  const handleConnectWallet = async () => {
    try {
      await connectWallet();
      setRegistrationStep('register');
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  // Handle form submission
  const onSubmit = async (data: RegisterFormValues) => {
    try {
      await registerStudent(data.name, data.email, data.studentId, data.department);
      setRegistrationStep('success');
      
      // Show success toast
      toast({
        title: "Registration Successful",
        description: "Your student ID has been registered on the blockchain.",
      });
      
      // Redirect to dashboard after 3 seconds
      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
    } catch (error: any) {
      toast({
        title: "Registration Failed",
        description: error.message || "Failed to register. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Effect to update step when connection status changes
  React.useEffect(() => {
    if (isConnected && registrationStep === 'connect') {
      setRegistrationStep('register');
    }
    if (isRegistered) {
      setRegistrationStep('success');
    }
  }, [isConnected, isRegistered, registrationStep]);

  return (
    <div className="max-w-3xl mx-auto pt-12 pb-24 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Student Registration</h1>
      <p className="text-center text-gray-600 mb-12">
        Register your identity on the blockchain to access all EduVerse features.
        Each student can only register once with unique credentials.
      </p>

      {registrationStep === 'connect' && (
        <Card className="border-2 border-eduverse-primary/20">
          <CardHeader>
            <CardTitle>Connect Your Wallet</CardTitle>
            <CardDescription>
              First, connect your wallet to continue with registration
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button 
              onClick={handleConnectWallet} 
              className="gap-2"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Wallet className="h-5 w-5" />
              )}
              Connect Wallet
            </Button>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground">
              You'll need a compatible blockchain wallet like MetaMask to register.
            </p>
          </CardFooter>
        </Card>
      )}

      {registrationStep === 'register' && (
        <Card className="border-2 border-eduverse-primary/20">
          <CardHeader>
            <CardTitle>Student Information</CardTitle>
            <CardDescription>
              Your information will be securely stored on the blockchain and used to verify your identity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="john.doe@university.edu" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="studentId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Student ID</FormLabel>
                      <FormControl>
                        <Input placeholder="S12345" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your department" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="computer-science">Computer Science</SelectItem>
                          <SelectItem value="engineering">Engineering</SelectItem>
                          <SelectItem value="business">Business</SelectItem>
                          <SelectItem value="arts">Arts & Humanities</SelectItem>
                          <SelectItem value="science">Science</SelectItem>
                          <SelectItem value="medicine">Medicine</SelectItem>
                          <SelectItem value="law">Law</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Alert className="bg-amber-50 border-amber-200">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                  <AlertTitle className="text-amber-800">Important</AlertTitle>
                  <AlertDescription className="text-amber-700">
                    Your information will be permanently stored on the blockchain. 
                    Each student can only register once, and duplicate information 
                    will be rejected.
                  </AlertDescription>
                </Alert>
                
                <Button 
                  type="submit" 
                  className="w-full mt-4" 
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Registering...
                    </>
                  ) : (
                    "Register on Blockchain"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}

      {registrationStep === 'success' && (
        <Card className="border-2 border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-green-600" />
              Registration Successful
            </CardTitle>
            <CardDescription className="text-green-700">
              Your identity has been registered on the blockchain
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-center text-green-700 mb-4">
              Congratulations! You are now a verified student on the EDU Chain.
              You'll be redirected to your dashboard shortly.
            </p>
            <div className="flex justify-center">
              <Button
                onClick={() => navigate('/dashboard')}
                className="bg-green-600 hover:bg-green-700"
              >
                Go to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Register; 