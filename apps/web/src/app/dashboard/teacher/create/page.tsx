// import CreateContentForm from './components/CreateContentForm';

import dynamic from 'next/dynamic';

const CreateContentForm = dynamic(
  () => import('./components/CreateContentForm'),
  {
    ssr: false,
  },
);

const Create = () => {
  return (
    <div>
      <CreateContentForm />
    </div>
  );
};

export default Create;
