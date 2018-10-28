import React from 'react';
import Loadable from 'react-loadable';

const Loading = () => <div>Loading...</div>;

const Home = Loadable({
  loader: () => import('./components/Home'),
  loading: Loading,
});

const Login = Loadable({
  loader: () => import('./components/auth/Login'),
  loading: Loading,
});

const Profile = Loadable({
  loader: () => import('./components/user/Profile'),
  loading: Loading,
});

const About = Loadable({
    loader: () => import('./components/About'),
    loading: Loading,
});

const Footer = Loadable({
    loader: () => import('./components/Footer'),
    loading: Loading,
});

const News = Loadable({
    loader: () => import('./components/News'),
    loading: Loading,
});

const Privacy = Loadable({
    loader: () => import('./components/Privacy'),
    loading: Loading,
});

const Terms = Loadable({
    loader: () => import('./components/Terms'),
    loading: Loading,
});

export { Home, Login, Profile, About, Footer, News, Privacy, Terms }