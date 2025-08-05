'use client';

import { useCallback, useEffect, useState } from 'react';

import { deburr } from 'lodash';
import { QrCodePix } from 'qrcode-pix';

import createPayment from '@/db/actions/payments/createPayment';
import updatePayment from '@/db/actions/payments/updatePayment';
import getClientLocation from '@/functions/getClientLocation';
import PixProtocol from '@/interfaces/pixProtocol';

import { useToastContext } from '../toastContext/useContext';

interface Props extends PixProtocol {
  value: number;
  userDocument: string;
  userPassword: string;
}

export default function useQRCode({
  pixKey,
  pixName,
  value,
  userDocument,
  userPassword,
}: Props) {
  const [QRData, seQRData] = useState({
    src: '',
    name: '',
  });
  const [initialRender, setInitialRender] = useState(true);
  const [paymentId, setPaymentId] = useState('');
  const { setToast } = useToastContext();

  const handleQRCode = useCallback(
    async (qrCodePix: {
      payload: () => string;
      base64: (options?: any) => Promise<string>;
    }) => {
      try {
        const name = qrCodePix.payload();
        let src = await qrCodePix.base64();
        seQRData({
          name,
          src,
        });
        const clientLocation = await getClientLocation();
        const createdPaymentId = await createPayment({
          copied: false,
          location: clientLocation,
          idDocument: userDocument,
          password: userPassword,
          value,
        });
        if (createdPaymentId) setPaymentId(createdPaymentId);
      } catch (err) { } //eslint-disable-line
    },
    [value, userDocument, userPassword]
  );

  useEffect(() => {
    if (initialRender) {
      const clearName = deburr(pixName.replace(/\s/g, ''));
      const qrCodePix = QrCodePix({
        version: '01',
        key: pixKey, //or any PIX key
        name: clearName,
        city: 'GOIANIA-GO',
        transactionId: Date.now().toString(), //max 25 characters
        cep: '74003010',
        value,
      });
      handleQRCode(qrCodePix);
      setInitialRender(false);
    }
  }, [initialRender, pixKey, pixName, value, handleQRCode]);

  const handleCopy = async () => {
    try {
      if (QRData) navigator.clipboard.writeText(QRData.name);
      setToast({
        open: true,
        severity: 'success',
        message: 'Código PIX copiado!',
      });
      await updatePayment(paymentId, { copied: true });
    } catch (err) { } // eslint-disable-line
  };

  return { QRData, handleCopy };
}
