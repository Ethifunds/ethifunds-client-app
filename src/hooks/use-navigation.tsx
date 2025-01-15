import { useNavigate, To, NavigateOptions, useLocation, useParams,  } from 'react-router-dom';


type ToExtended = To | number;


const useCustomNavigation = () => {
  const location = useLocation();
  const getParams = useParams();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  const navigateTo = (path: ToExtended, options: NavigateOptions = {}) => {
    if (typeof path === 'number') {
      navigate(path);
    } else {
      navigate(path, options);
    }
  };
  return { navigate: navigateTo, getParams, location, queryParams };
};

export default useCustomNavigation;
