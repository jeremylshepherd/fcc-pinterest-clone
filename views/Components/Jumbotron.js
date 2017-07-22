var React = require("react");

export default class Jumbotron extends React.Component {
    constructor(props) {
        super(props);
        
        this.state ={
           isShadow: false
        };
        
        this.toggleShadow = this.toggleShadow.bind(this);
        
    }
    
    toggleShadow() {
        this.setState({isShadow : !this.state.isShadow});
    }
    
    render() {
        let user = this.props.displayName ? "Hello, " + this.props.displayName : "User Authentication";
        let shadow = this.state.isShadow ? 'shadow' : '';
        let greeting;
            if(this.props.displayName) {
                greeting = <h3>Welcome back! Let's get started with a new Project!</h3>;
            }else{
                greeting = (
                    <div>
                        <p>Login or Register with:</p>
                
                        <a href="/auth/google" className="btn btn-danger"><span className="fa fa-google-plus" alt="google logo"></span> Google</a>
                        <a href="/auth/github" className="btn btn-custom-darken"><span className="fa fa-github" alt="github logo"></span> Github</a>
                    </div>
                );
            }
        
        return (
            <div className="container">
                <div className={"jumbotron text-center " + shadow} onClick={this.toggleShadow}>
                    <h1><span className="fa fa-user"></span> {user}</h1>
                    {greeting}
                </div>
            </div>
            
        );
    }
};