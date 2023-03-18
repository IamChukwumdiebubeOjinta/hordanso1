export interface NavbarLinkProps {
  to: string ;
  text?: string;
}

export interface NavProfileProps {
  avatar: {
    alt?: string;
    image: string;
  };
  info: {
    name: string;
  };
}