var React = require('react');

var BaseLayout = require('./base.jsx').BaseLayout;

function LoginLayout(props){
  return (
    <BaseLayout {...props}>
      <div>{props.children}</div>
    </BaseLayout>
  );
}
module.exports = {
  LoginLayout
};
