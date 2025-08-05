import z from 'zod';

import validationCNPJ from '@/services/validationCNPJ';
import validationCPF from '@/services/validationCPF';

export const zodSchema = z
  .object({
    typeClient: z.string().trim(),
    idDocument: z.string().trim(),
    password: z.string().trim().min(1, 'Senha é obrigatória'),
  })
  .superRefine((value, ctx) => {
    const typeClient = value.typeClient.toLowerCase().trim();
    const idDocument = value.idDocument;

    if (typeClient === 'pessoa física' && !validationCPF(idDocument)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `CPF inválido`,
        path: ['idDocument'],
      });
      return;
    }
    if (typeClient === 'pessoa jurídica' && !validationCNPJ(idDocument)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `CNPJ inválido`,
        path: ['idDocument'],
      });
    }
  });

export type BodyProtocol = z.infer<typeof zodSchema>;
