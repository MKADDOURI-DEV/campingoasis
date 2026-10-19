import { siteConfig } from '@/config/site';

export interface RequestPayload {
  name: string;
  arrival: string;
  departure: string;
  guests: string;
  vehicle: string;
  message: string;
}

interface WaLabels {
  intro: string;
  name: string;
  dates: string;
  guests: string;
  vehicle: string;
  message: string;
}

export function buildMessage(payload: RequestPayload, labels: WaLabels): string {
  const lines: string[] = [labels.intro];
  if (payload.name) lines.push(`${labels.name}: ${payload.name}`);
  if (payload.arrival || payload.departure) {
    lines.push(`${labels.dates}: ${payload.arrival || '?'} → ${payload.departure || '?'}`);
  }
  if (payload.guests) lines.push(`${labels.guests}: ${payload.guests}`);
  if (payload.vehicle) lines.push(`${labels.vehicle}: ${payload.vehicle}`);
  if (payload.message) lines.push(`${labels.message}: ${payload.message}`);
  return lines.join('\n');
}

export function whatsappUrl(text: string): string | null {
  const num = siteConfig.whatsappNumber.replace(/[^\d]/g, '');
  if (!num) return null;
  return `https://wa.me/${num}?text=${encodeURIComponent(text)}`;
}

export function mailtoUrl(subject: string, body: string): string | null {
  if (!siteConfig.email) return null;
  return `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}