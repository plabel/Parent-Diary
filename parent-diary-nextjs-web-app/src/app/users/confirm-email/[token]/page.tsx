"use client";
import { useAlert } from "@/app/_global/alert/alert-provider";
import Link from "next/link";
import { useEffect, useState } from "react";
import { confirmEmail } from "./helpers/confirmEmail";
import QRCode from 'qrcode'
import { useParams } from 'next/navigation'

export default function ConfirmEmail() {
  const params = useParams<{ token: string }>()
  const showAlert = useAlert();
  const token = params.token;
  const [otpAuthUrl, setOtpAuthUrl] = useState<string | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');

  useEffect(() => {
    confirmEmail(token, setIsConfirmed, showAlert, setOtpAuthUrl);
  }, []);

  useEffect(() => {
    if (!otpAuthUrl) return;
    
    QRCode.toDataURL(otpAuthUrl)
      .then(url => setQrCodeUrl(url))
      .catch(error => {
        console.error('Failed to generate QR code:', error);
        setQrCodeUrl('');
      });
  }, [otpAuthUrl]);

  return (
    <main className={"centered-main w-100 m-auto"}>
      {isConfirmed ? (
        <div>
          <h3>
            Email confirmed 
          </h3>
          <div className="alert alert-warning" role="alert">
            Scan the QR code with your authenticator app to enable 2FA
          </div>
          <div>
            {qrCodeUrl && (
              <img src={qrCodeUrl} alt="QR Code for 2FA" width={200} height={200} />
            )}
          </div>
          <Link href="/login">Log in</Link>
        </div>
      ) : (
        <h3>Loading...</h3>
      )}
    </main>
  );
}
