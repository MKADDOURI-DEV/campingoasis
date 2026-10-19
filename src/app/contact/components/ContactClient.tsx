'use client';

import React, { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import { useTranslation } from '@/context/LanguageContext';
import { siteConfig } from '@/config/site';
import { buildMessage, mailtoUrl, whatsappUrl, type RequestPayload } from '@/lib/whatsapp';

interface FormState {
  name: string;
  email: string;
  phone: string;
  arrival: string;
  departure: string;
  guests: string;
  vehicle: string;
  message: string;
  consent: boolean;
}

type Errors = Partial<Record<keyof FormState | 'contact' | 'dates', string>>;
type Status = 'idle' | 'prepared' | 'notConfigured';

const initial: FormState = {
  name: '',
  email: '',
  phone: '',
  arrival: '',
  departure: '',
  guests: '2',
  vehicle: '',
  message: '',
  consent: false,
};

export default function ContactClient() {
  const { t, raw } = useTranslation();
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [today, setToday] = useState('');

  React.useEffect(() => {
    setToday(new Date().toISOString().slice(0, 10));
  }, []);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const validate = (): Errors => {
    const e: Errors = {};
    if (!form.name.trim()) e.name = t('contact.errors.name');
    if (!form.phone.trim() && !form.email.trim()) e.contact = t('contact.errors.contact');
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      e.email = t('contact.errors.emailInvalid');
    }
    if (!form.arrival) e.arrival = t('contact.errors.arrival');
    else if (today && form.arrival < today) e.arrival = t('contact.errors.past');
    if (!form.departure) e.departure = t('contact.errors.departure');
    if (form.arrival && form.departure && form.departure <= form.arrival) {
      e.dates = t('contact.errors.dates');
    }
    const g = Number(form.guests);
    if (!Number.isInteger(g) || g < 1 || g > 30) e.guests = t('contact.errors.guests');
    if (!form.consent) e.consent = t('contact.errors.consent');
    return e;
  };

  const vehicleLabel = (v: string) => {
    const map: Record<string, string> = {
      motorhome: t('contact.motorhome'),
      van: t('contact.van'),
      tent: t('contact.tent'),
      other: t('contact.other'),
    };
    return map[v] || '';
  };

  const labels = () => {
    const l = raw('contact.waMessage') as Record<string, string>;
    return {
      intro: l.intro,
      name: l.name,
      dates: l.dates,
      guests: l.guests,
      vehicle: l.vehicle,
      message: l.message,
    };
  };

  const payload = (): RequestPayload => ({
    name: form.name.trim(),
    arrival: form.arrival,
    departure: form.departure,
    guests: form.guests,
    vehicle: vehicleLabel(form.vehicle),
    message: form.message.trim(),
  });

  const onSubmitEmail = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    const body = buildMessage(payload(), labels());
    const extra = [form.phone && `Tel: ${form.phone}`, form.email && `Email: ${form.email}`]
      .filter(Boolean)
      .join('\n');
    const url = mailtoUrl(t('contact.title'), extra ? `${body}\n${extra}` : body);
    if (!url) {
      setStatus('notConfigured');
      return;
    }
    window.location.href = url;
    setStatus('prepared');
  };

  const onWhatsApp = () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    const url = whatsappUrl(buildMessage(payload(), labels()));
    if (!url) {
      setStatus('notConfigured');
      return;
    }
    window.open(url, '_blank', 'noopener,noreferrer');
    setStatus('prepared');
  };

  const field =
    'w-full min-h-[48px] rounded-2xl border border-input bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none';
  const labelCls = 'mb-2 block text-sm font-semibold text-primary';
  const errCls = 'mt-2 text-sm font-medium text-destructive';

  return (
    <>
      <PageHero eyebrow={t('nav.contact')} title={t('contact.title')} lead={t('contact.lead')} />

      <section className="bg-background pb-20 pt-12 md:pb-28 md:pt-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 md:px-8 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-8">
            <form
              onSubmit={onSubmitEmail}
              noValidate
              className="rounded-[2rem] border border-border bg-card p-6 md:p-10"
            >
              <div className="mb-8 flex items-start gap-3 rounded-2xl bg-secondary p-4">
                <Icon name="InformationCircleIcon" size={22} className="mt-0.5 shrink-0 text-primary" />
                <p className="text-sm leading-relaxed text-foreground">{t('contact.notReservation')}</p>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label htmlFor="name" className={labelCls}>{t('contact.name')}</label>
                  <input
                    id="name"
                    className={field}
                    value={form.name}
                    onChange={(e) => set('name', e.target.value)}
                    autoComplete="name"
                    aria-invalid={Boolean(errors.name)}
                  />
                  {errors.name && <p className={errCls} role="alert">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className={labelCls}>{t('contact.phone')}</label>
                  <input
                    id="phone"
                    type="tel"
                    className={field}
                    value={form.phone}
                    onChange={(e) => set('phone', e.target.value)}
                    autoComplete="tel"
                    aria-invalid={Boolean(errors.contact)}
                  />
                </div>
                <div>
                  <label htmlFor="email" className={labelCls}>{t('contact.email')}</label>
                  <input
                    id="email"
                    type="email"
                    className={field}
                    value={form.email}
                    onChange={(e) => set('email', e.target.value)}
                    autoComplete="email"
                    aria-invalid={Boolean(errors.email || errors.contact)}
                  />
                  {errors.email && <p className={errCls} role="alert">{errors.email}</p>}
                </div>
                {errors.contact && (
                  <p className={`${errCls} md:col-span-2`} role="alert">{errors.contact}</p>
                )}

                <div>
                  <label htmlFor="arrival" className={labelCls}>{t('contact.arrival')}</label>
                  <input
                    id="arrival"
                    type="date"
                    min={today}
                    className={field}
                    value={form.arrival}
                    onChange={(e) => set('arrival', e.target.value)}
                    aria-invalid={Boolean(errors.arrival)}
                  />
                  {errors.arrival && <p className={errCls} role="alert">{errors.arrival}</p>}
                </div>
                <div>
                  <label htmlFor="departure" className={labelCls}>{t('contact.departure')}</label>
                  <input
                    id="departure"
                    type="date"
                    min={form.arrival || today}
                    className={field}
                    value={form.departure}
                    onChange={(e) => set('departure', e.target.value)}
                    aria-invalid={Boolean(errors.departure || errors.dates)}
                  />
                  {errors.departure && <p className={errCls} role="alert">{errors.departure}</p>}
                  {errors.dates && <p className={errCls} role="alert">{errors.dates}</p>}
                </div>

                <div>
                  <label htmlFor="guests" className={labelCls}>{t('contact.guests')}</label>
                  <input
                    id="guests"
                    type="number"
                    min={1}
                    max={30}
                    inputMode="numeric"
                    className={field}
                    value={form.guests}
                    onChange={(e) => set('guests', e.target.value)}
                    aria-invalid={Boolean(errors.guests)}
                  />
                  {errors.guests && <p className={errCls} role="alert">{errors.guests}</p>}
                </div>
                <div>
                  <label htmlFor="vehicle" className={labelCls}>{t('contact.vehicle')}</label>
                  <select
                    id="vehicle"
                    className={field}
                    value={form.vehicle}
                    onChange={(e) => set('vehicle', e.target.value)}
                  >
                    <option value="">{t('contact.vehicleSelect')}</option>
                    <option value="motorhome">{t('contact.motorhome')}</option>
                    <option value="van">{t('contact.van')}</option>
                    <option value="tent">{t('contact.tent')}</option>
                    <option value="other">{t('contact.other')}</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="message" className={labelCls}>{t('contact.message')}</label>
                  <textarea
                    id="message"
                    rows={4}
                    className={field}
                    value={form.message}
                    onChange={(e) => set('message', e.target.value)}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      checked={form.consent}
                      onChange={(e) => set('consent', e.target.checked)}
                      className="mt-1 h-5 w-5 shrink-0 accent-[var(--primary)]"
                      aria-invalid={Boolean(errors.consent)}
                    />
                    <span className="text-sm leading-relaxed text-foreground">{t('contact.consent')}</span>
                  </label>
                  {errors.consent && <p className={errCls} role="alert">{errors.consent}</p>}
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row" id="whatsapp">
                <button
                  type="submit"
                  className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-primary px-8 text-base font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
                >
                  <Icon name="EnvelopeIcon" size={20} />
                  {t('contact.submit')}
                </button>
                <button
                  type="button"
                  onClick={onWhatsApp}
                  className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-accent px-8 text-base font-semibold text-accent-foreground transition-transform hover:scale-[1.03]"
                >
                  <Icon name="ChatBubbleLeftRightIcon" size={20} />
                  {t('contact.whatsappSend')}
                </button>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{t('contact.whatsappNote')}</p>

              {status === 'prepared' && (
                <div role="status" className="mt-6 rounded-2xl bg-success p-5 text-success-foreground">
                  <p className="font-semibold">{t('contact.preparedTitle')}</p>
                  <p className="mt-1 text-sm">{t('contact.preparedBody')}</p>
                </div>
              )}
              {status === 'notConfigured' && (
                <div role="alert" className="mt-6 rounded-2xl bg-warning p-5 text-warning-foreground">
                  <p className="font-semibold">{t('contact.notConfiguredTitle')}</p>
                  <p className="mt-1 text-sm">{t('contact.notConfiguredBody')}</p>
                </div>
              )}
            </form>
          </Reveal>

          <Reveal delay={150} className="lg:col-span-4">
            <aside className="flex h-full flex-col gap-6 lg:sticky lg:top-28">
              <div className="rounded-[2rem] bg-primary p-8 grain">
                <Icon name="MapPinIcon" size={28} className="text-accent" />
                <h2 className="font-display mt-4 text-2xl text-primary-foreground">
                  {t('contact.addressTitle')}
                </h2>
                <p className="mt-3 text-base leading-relaxed text-primary-foreground/80">
                  {siteConfig.address}
                </p>
              </div>
              {siteConfig.phone && (
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
                  className="flex min-h-[56px] items-center gap-3 rounded-[2rem] border border-border bg-card p-5 text-primary"
                >
                  <Icon name="PhoneIcon" size={22} />
                  <span className="text-base font-semibold">{siteConfig.phone}</span>
                </a>
              )}
              {siteConfig.email && (
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex min-h-[56px] items-center gap-3 rounded-[2rem] border border-border bg-card p-5 text-primary"
                >
                  <Icon name="EnvelopeIcon" size={22} />
                  <span className="break-all text-base font-semibold">{siteConfig.email}</span>
                </a>
              )}
            </aside>
          </Reveal>
        </div>
      </section>
    </>
  );
}