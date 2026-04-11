import type { Metadata } from 'next';
import Presentation from '@components/Presentation';

export const metadata: Metadata = {
  title: 'Fortune Tiger: A Tale of Subdomain Takeover - Alexander Scheibler\'s talk on AtlSecCon 2026',
  description: 'A cleanup script gone wrong deleted a critical S3 redirection bucket, allowing an attacker to claim the globally unique bucket name and hijack a corporate subdomain - serving illegal Fortune Tiger iGaming content to all visitors for 90 minutes before mitigations were in place.',
};

export default function PresentationPage() {
  return (
    <main className="font-josefin" style={{ width: '100%', height: '100vh', overflow: 'hidden', background: '#1a1a1a' }}>
      <Presentation />
    </main>
  );
}