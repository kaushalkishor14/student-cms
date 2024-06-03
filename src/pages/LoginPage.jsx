


import { useForm } from 'react-hook-form';


import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/common/AuthProvider';
import { useNavigate } from 'react-router-dom';
import {LoginUser} from '@/common/apiHandler';


export default function loginPage() {
  const form = useForm()
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handelInput = (e) => {
    form.setValue(e.target.name, e.target.value)
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    LoginUser(form.getValues(), setIsSubmitting, navigate, login);
  }

  return (
    <div className="flex justify-center  items-center min-h-screen">
      <div className="w-full max-w-sm p-8 space-y-8 bg-white border rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight lg:text-4xl mb-6">
            Admin <br /> Login
          </h1>
          <p className="mb-4">Sign up to start your anonymous adventure</p>
        </div>
        <Form {...form}>
          <form className="space-y-6">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <Input {...field} name="email" onChange={handelInput}/>
                  {/* <p className='text-muted text-gray-600 text-sm'>We will send you a verification code</p> */}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <Input type="password" {...field } name="password" onChange={handelInput} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='w-full'
              disabled={isSubmitting} 
              onClick={handelSubmit}
              >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                'Login'
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
