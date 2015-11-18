var Env = {
  envName: 'local',
  serverDomain: [location.protocol, '//', document.domain, ':', '3000'].join('')
};

export default Env;
