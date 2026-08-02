import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Text } from './atoms/Text';
import { Button } from './atoms/Button';
import { Checkbox } from './atoms/Checkbox';
import { Toggle } from './atoms/Toggle';
import { Bubble } from './atoms/Bubble';
import { ProgressRing } from './atoms/ProgressRing';
import { BatteryIndicator } from './atoms/BatteryIndicator';
import { CapyMascot, CapyMascotHead, CapyMascotBody } from './atoms/CapyMascot';
import { Favicon } from './atoms/Favicon';
import { Locked } from './atoms/Locked';
import {
  BackIcon,
  NextIcon,
  PauseIcon,
  PlayIcon,
  RestartIcon,
  ReturnIcon,
  SkipIcon,
  StatsIcon,
} from './atoms/icons';

import { Field } from './molecules/Field';
import { ColorPicker } from './molecules/ColorPicker';
import { DialogueBubble } from './molecules/DialogueBubble';
import { TimeTabs } from './molecules/TimeTabs';
import { TimerToggle } from './molecules/TimerToggle';
import { Coin, CoinWallet } from './molecules/CoinWallet';
import { DailyStreaks } from './molecules/DailyStreaks';

import { Modal } from './organisms/Modal';
import { InAppPurchaseCard } from './organisms/InAppPurchase';
import { TrendCard } from './organisms/TrendCard';
import { PieChart } from './organisms/PieChart';
import { BarChart } from './organisms/BarChart';

const meta: Meta = {
  title: 'CozyUI/Overview',
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj;

function Section({ title, hint, children }: { title: string; hint: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 44 }}>
      <h2
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--color-brand-brown)',
          margin: '0 0 2px',
        }}
      >
        {title}
      </h2>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--color-brand-grey)', margin: '0 0 16px' }}>
        {hint}
      </p>
      <div
        style={{
          borderTop: '1px solid rgba(0,0,0,0.08)',
          paddingTop: 20,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 28,
          alignItems: 'flex-start',
        }}
      >
        {children}
      </div>
    </section>
  );
}

function Item({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 0 }}>
      <code
        style={{
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
          fontSize: 11,
          color: 'var(--color-brand-grey)',
        }}
      >
        {name}
      </code>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>{children}</div>
    </div>
  );
}

const trendStats = [{ value: '2/4', unit: 'completed' }] as const;
const pieData = [
  { label: 'study', value: 30, color: 'var(--color-green-secondary)' },
  { label: 'workout', value: 15, color: 'var(--color-blue-secondary)' },
  { label: 'cooking', value: 5, color: 'var(--color-red-secondary)' },
  { label: 'others', value: 3, color: 'var(--color-grey-primary)' },
];
const barData = [
  { value: 20, label: '9:00am' },
  { value: 12 },
  { value: 6, label: '12:00pm' },
  { value: 45 },
  { value: 33, label: '9:00pm' },
];

/**
 * Every component in one scannable page, grouped the same way the sidebar is.
 * Use this to find the right component fast; open its own page for props,
 * states, and edge cases.
 */
export const AllComponents: Story = {
  render: () => (
    <div style={{ padding: 32, maxWidth: 1100 }}>
      <Section title="Foundations" hint="Typography and iconography everything else is built on.">
        <Item name="<Text />">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-start' }}>
            <Text variant="mainTimerNumber">25:00</Text>
            <Text variant="h1">time to focus</Text>
            <Text variant="heading1">Heading 1</Text>
            <Text variant="body1">Body 1</Text>
          </div>
        </Item>
        <Item name="icons">
          <PlayIcon />
          <PauseIcon />
          <SkipIcon />
          <BackIcon />
          <NextIcon />
          <RestartIcon />
          <ReturnIcon />
          <StatsIcon />
        </Item>
      </Section>

      <Section title="Controls" hint="The everyday interactive set — start here for most screens.">
        <Item name="<Button />">
          <Button variant="filled">Filled</Button>
          <Button variant="outlined">Outlined</Button>
          <Button variant="ghost">Ghost</Button>
        </Item>
        <Item name="<Checkbox />">
          <Checkbox defaultChecked />
          <Checkbox />
        </Item>
        <Item name="<Toggle />">
          <Toggle defaultChecked />
          <Toggle />
        </Item>
        <Item name="<Field />">
          <Field label="Field" placeholder="entered text" />
        </Item>
        <Item name="<ColorPicker />">
          <ColorPicker defaultValue="green" />
        </Item>
      </Section>

      <Section title="Speech Bubbles" hint="DialogueBubble is a Bubble plus a tail — same hand-drawn outline engine.">
        <Item name="<Bubble />">
          <Bubble>hi</Bubble>
        </Item>
        <Item name="<DialogueBubble />">
          <DialogueBubble placement="bottom">time to take a break!</DialogueBubble>
        </Item>
      </Section>

      <Section title="Timer" hint="Chrome for the focus session itself.">
        <Item name="<TimeTabs />">
          <TimeTabs tabs={['Today', 'Week', 'Month']} defaultValue="Today" />
        </Item>
        <Item name="<TimerToggle />">
          <TimerToggle defaultValue="up" />
        </Item>
      </Section>

      <Section title="Coins & Purchases" hint="CoinWallet and InAppPurchaseCard both compose Coin.">
        <Item name="<Coin />">
          <Coin />
        </Item>
        <Item name="<CoinWallet />">
          <CoinWallet amount={78160} />
        </Item>
        <Item name="<InAppPurchaseCard />">
          <InAppPurchaseCard coins={1000} price="$0.99" coinCount={1} />
          <InAppPurchaseCard coins={10000} price="$4.99" featured />
          <InAppPurchaseCard coins={2000} price="$1.99" coinCount={2} />
        </Item>
      </Section>

      <Section title="Progress & Stats" hint="Readouts for streaks, sessions, and history.">
        <Item name="<ProgressRing />">
          <ProgressRing value={25} size={24} />
          <ProgressRing value={50} size={24} />
          <ProgressRing value={75} size={24} />
        </Item>
        <Item name="<BatteryIndicator />">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <BatteryIndicator variant="default" />
            <BatteryIndicator variant="variant3" />
          </div>
        </Item>
        <Item name="<TrendCard />">
          <TrendCard title="Sessions" stats={[...trendStats]} indicator={<ProgressRing value={50} />} />
        </Item>
        <Item name="<DailyStreaks />">
          <DailyStreaks
            rows={[
              { label: 'Study', checked: [true, false, false, false, false] },
              { label: 'Cook', checked: [true, true, false, false, false] },
            ]}
          />
        </Item>
        <Item name="<PieChart />">
          <PieChart title="Categories" data={pieData} />
        </Item>
        <Item name="<BarChart />">
          <BarChart title="Average Session Length" data={barData} max={90} />
        </Item>
      </Section>

      <Section title="Overlays" hint="Anything that renders above the page.">
        <Item name="<Modal />">
          <Modal trigger="Open modal" title="Modal" />
        </Item>
      </Section>

      <Section title="Brand" hint="Mascot and identity artwork — decorative, not interactive.">
        <Item name="<CapyMascot />">
          <CapyMascot size={120} />
          <CapyMascot variant="rough" size={120} />
        </Item>
        <Item name="<CapyMascotHead /> / <CapyMascotBody />">
          <CapyMascotHead size={70} />
          <CapyMascotBody size={70} />
        </Item>
        <Item name="<Favicon />">
          <Favicon size={48} />
        </Item>
        <Item name="<Locked />">
          <Locked size={48} />
        </Item>
      </Section>
    </div>
  ),
};
