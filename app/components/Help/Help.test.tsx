import {render, screen} from '@testing-library/react'
import Help from '../Help'

describe('Help', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the Help section', () => {
    render(<Help />);

    const helpSectionHeader = screen.getByText(/How can I help\?/i);

    expect(helpSectionHeader).toBeInTheDocument();
  });

  it('renders Help card 1', () => {
    render(<Help />);

    const title = screen.getByText(/Is my app always on?/i);
    expect(title).toBeVisible();

    const description = screen.getByText("Adding monitoring and alerts so your team can catch critical issues and quickly resolve them before they affect your customers.");
    expect(description).toBeVisible();
  });

  it('renders Help card 2', () => {
    render(<Help />);

    const title = screen.getByText(/Is my app always on\?/i);
    expect(title).toBeVisible();

    const description = screen.getByText("Adding monitoring and alerts so your team can catch critical issues and quickly resolve them before they affect your customers.");
    expect(description).toBeVisible();
  });

  it('renders Help card 3', () => {
    render(<Help />);

    const title = screen.getByText(/Will my app keep working if I change things\?/i);
    expect(title).toBeVisible();

    const description = screen.getByText("Setting up automated tests allows you to verify that core functionality still works every time an update is made.");
    expect(description).toBeVisible();
  });

  it('renders Help card 4', () => {
    render(<Help />);

    const title = screen.getByText(/Can my app scale as my business grows\?/i);
    expect(title).toBeVisible();

    const description = screen.getByText("Running performance tests will offer you some answers about how many users your app can safely handle.");
    expect(description).toBeVisible();
  });

  it('renders Help card 5', () => {
    render(<Help />);

    const title = screen.getByText(/Is my data safe and secure\?/i);
    expect(title).toBeVisible();

    const description = screen.getByText("Analysis and security questionnaires tailored to your business needs, ensuring compliance with standards, including for LGPD in Brazil.");
    expect(description).toBeVisible();
  });

  it('renders Help card 6', () => {
    render(<Help />);

    const title = screen.getByText("What happened with my app\?\!");
    expect(title).toBeVisible();

    const description = screen.getByText("With expertise in investigation and Root Cause Analysis (RCA), together we can identify what happened in an incident, why it happened, and the steps to prevent it in the future.");
    expect(description).toBeVisible();
  });

  it('renders the ChevronDown icon linking to projects', () => {
    render(<Help />);

    const chevronLink = screen.getByRole('link', { name: /Projects. What have I done/i });
    expect(chevronLink).toBeInTheDocument();
    expect(chevronLink).toHaveAttribute('href', '#projects');
  });
});