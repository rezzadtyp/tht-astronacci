import Header from '@/components/Header';
import { Metadata } from 'next';
import RegisterForm from './components/RegisterForm';

export const metadata: Metadata = {
  title: 'Register',
  description: 'Register bang hehe',
};

const Register = () => {
  return (
    <div className="container mx-auto px-4">
      <Header />
      <RegisterForm />
    </div>
  );
};

export default Register;
