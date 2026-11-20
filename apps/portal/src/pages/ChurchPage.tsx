import { lazy } from 'react';
import RemoteSlot from '../components/RemoteSlot';
import type { Locale, Theme } from '../components/TopBar';

const VerseBanner = lazy(() => import('verse_widget/VerseBanner'));

export default function ChurchPage({ theme, locale }: { theme: Theme; locale: Locale }) {
  return (
    <section className="church">
      <div className="church__bar">
        <b>Example Church</b>
        <span>“In practice” tab</span>
      </div>
      <div className="church__banner">
        <RemoteSlot label="verse_widget/VerseBanner">
          <VerseBanner theme={theme} locale={locale} />
        </RemoteSlot>
      </div>
      <div className="church__body">
        <div className="ccard">
          <b>Services</b>Sunday 10am and 6pm
          <br />
          Wednesday 8pm
        </div>
        <div className="ccard">
          <b>Announcements</b>Youth meeting on Saturday at 7pm.
        </div>
        <div className="ccard">
          <b>Calendar</b>Baptism on the 30th. Sign up at the front desk.
        </div>
      </div>
    </section>
  );
}
