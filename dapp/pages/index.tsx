import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Button from '../components/Button';
import SignUpForm from '../components/SignUpForm';
import useDwitter from '../hooks/useDwitter';

export default function Home() {
  const { connect, account, user, createUser } = useDwitter();
 console.log('useracc',user )
  return (
    <div className="flex min-h-screen flex-col  justify-center py-2">
      <Head>
        <title>Dwitter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 ">
        <h1 className="mb-8 text-6xl font-bold">
          Welcome to <span className="text-blue-400"> Dwitter </span>
        </h1>
        {!account ? (
          <Button label="Connect With Ethreum" onClick={connect} />
        ) : account.toUpperCase() !== user?.wallet.toUpperCase() ? (
          <SignUpForm createUser={createUser} />
        ) : (
          <>
         <p className="text-red-400">connected to {account}</p>
          <div className="flex items-center w-80">
            <img src={user?.avatar} className='rounded-full h-16 w-16 mr-4'/>           
             <textarea className='rounded-xl' placeholder="what's happening"></textarea>            
          </div>
          <div className='mt-2 flex justify-end w-65'>
          <Button label='Tweet' onClick={() => console.log('todo:tweet')}/>
          </div>
          </>
          // <p>Hi {user?.name}</p>
        )}
      </main>

      <footer className="flex h-24 w-full items-center justify-center border-t">
        Powered by Ethereum
      </footer>
    </div>
  );
}
