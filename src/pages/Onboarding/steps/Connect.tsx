import React, { useState } from 'react';
import PlaidLinkButton from '../../../components/PlaidLinkButton';
import Sheet from '../../../components/Sheet';
import { ConnectChoose } from './ConnectChoose';
import { useAppState } from '../../../state/AppStateContext';
import ServerTest from '../../../components/ServerTest';

export default function Connect({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const [open, setOpen] = useState(false);
  const { setAccounts } = useAppState();
  
  return (
    <section>
      <h2>Let's connect your accounts</h2>
      <p>Connecting is optional. Guidewell provides educational scenarios, not financial advice.</p>
      
      <ServerTest />

      <PlaidLinkButton
        key="plaid-link-singleton"
        userId="demo-user-123"
        onSuccess={(linked) => {
          setAccounts(prev => [...prev, ...linked]);
          onNext();
        }}
      />

      {/* Add accounts another way button / sheet */}
      <button onClick={() => setOpen(true)}>
        Add accounts another way
      </button>
      
      <button onClick={onNext}>Skip</button>
      
      <Sheet open={open} onClose={() => setOpen(false)} title="Upload documents or enter manually">
        <ConnectChoose 
          onClose={() => setOpen(false)} 
          onComplete={() => { 
            setOpen(false); 
            onNext(); 
          }} 
        />
      </Sheet>
    </section>
  );
}
