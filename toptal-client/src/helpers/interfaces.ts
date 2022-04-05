export interface RouteProps {
  location: {
    state: any;
  };
  match: {
    params: {
      id: string;
    };
  };
}
