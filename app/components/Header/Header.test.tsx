import {fireEvent, render, screen} from '@testing-library/react'
import Header from '../Header'
import { screens } from '@data/ScreenSizes'
import { setViewportWidth } from "@utils/functions/testHelpers";

describe('Header', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders AppCheckWizard brand with a link to the home page', () => {
    render(<Header />);
    const siteNameElement = screen.getByText(/AppCheckWizard/i);
    expect(siteNameElement).toBeInTheDocument();
    expect(siteNameElement).toHaveAttribute('href', '/');
  });

  it('renders Home link', () => {
    render(<Header />);
    const homeLinkElement = screen.getByRole('link', { name: /Home/i });
    expect(homeLinkElement).toBeInTheDocument();
    expect(homeLinkElement).toHaveAttribute('href', '#home');
  });

  it('renders Skills link', () => {
    render(<Header />);

    const skillsLinkElement = screen.getByRole("link", {name: "Help. What can I do" })
    expect(skillsLinkElement).toBeInTheDocument();
    expect(skillsLinkElement).toHaveAttribute('href', '#help');
  });

  it('renders Projects link', () => {
    render(<Header />);

    const skillsLinkElement = screen.getByRole("link", {name: "Projects. What have I done" })
    expect(skillsLinkElement).toBeInTheDocument();
    expect(skillsLinkElement).toHaveAttribute('href', '#projects');
  });

  it('renders Contact link', () => {
    render(<Header />);

    const skillsLinkElement = screen.getByRole("link", {name: "Contact" })
    expect(skillsLinkElement).toBeInTheDocument();
    expect(skillsLinkElement).toHaveAttribute('href', '#contact');
  });

  it('does render mobile menu button on mobile', () => {
    setViewportWidth(screens.mobile)
    render(<Header />)
    const mobileMenuButton = screen.queryByTestId('mobile-menu-div')
    expect(mobileMenuButton).toHaveClass('md:hidden')
  })

  it('does not render mobile menu button on desktop', () => {
    setViewportWidth(screens.desktop)
    render(<Header />)
    const mobileMenuButton = screen.queryByTestId('mobile-menu-div')
    expect(mobileMenuButton).toHaveClass('md:hidden')
  })

  it('renders mobile navigation on mobile', () => {
    setViewportWidth(screens.mobile)
    render(<Header />)
    const mobileMenuButton = screen.queryByTestId('mobile-menu-button')
    if (mobileMenuButton) {
      fireEvent.click(mobileMenuButton)
    }
    const desktopNav = screen.getByTestId('mobile-nav')
    expect(desktopNav).toBeVisible()
  })

  it('renders full navigation on tablet', () => {
    setViewportWidth(screens.tablet)
    render(<Header />)
    const desktopNav = screen.getByTestId('desktop-nav')
    expect(desktopNav).toBeVisible()
  })

  it('renders full navigation on desktop', () => {
    setViewportWidth(screens.desktop)
    render(<Header />)
    const desktopNav = screen.getByTestId('desktop-nav')
    expect(desktopNav).toBeVisible()
  })
});