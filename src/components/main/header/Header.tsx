import "./Header.css";
import { Input, Switch, useMantineTheme, rem } from "@mantine/core";
import { IconSun, IconMoonStars, IconSearch } from "@tabler/icons-react";
import companylogo from "../../../assets/konada-logo.png";
import { Link } from "react-router-dom";
const Header = () => {
  const theme = useMantineTheme();

  const sunIcon = (
    <IconSun
      style={{ width: rem(16), height: rem(16) }}
      stroke={2.5}
      color={theme.colors.yellow[4]}
    />
  );

  const moonIcon = (
    <IconMoonStars
      style={{ width: rem(16), height: rem(16) }}
      stroke={2.5}
      color={theme.colors.blue[6]}
    />
  );

  return (
    <div>
      <div className="header">
        <Link to="/">
          <img className="companyLogo" src={companylogo} alt="company logo" />
        </Link>
        <div className="headerTitle">
          <Link to="/question">
            <span className="headerTextLink">Q&A</span>
          </Link>
          <Link to="/knowledge">
            <span className="headerTextLink">Knowledge</span>
          </Link>
          <Link to="/community">
            <span className="headerTextLink">Community</span>
          </Link>
          <Link to="/event">
            <span className="headerTextLink">Event</span>
          </Link>
          <Link to="/notice/info">
            <span className="headerTextLink">Announcement</span>
          </Link>
        </div>
        <Input
          ml="md"
          mr="md"
          placeholder="Search"
          radius={"xl"}
          leftSection={<IconSearch size={16} />}
        />
        <Switch
          size="lg"
          ml="md"
          mr="md"
          color="dark.4"
          onLabel={sunIcon}
          offLabel={moonIcon}
        />
        <button className="logIn">Login</button>
        <button className="signUp">Sign Up</button>
      </div>
    </div>
  );
};

export default Header;
