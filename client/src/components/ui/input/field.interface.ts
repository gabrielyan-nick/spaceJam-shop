import { InputHTMLAttributes } from 'react';

export interface IField extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}
