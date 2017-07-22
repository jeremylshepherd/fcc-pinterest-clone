import React from "react";
import Nav from "./Nav";
import Jumbotron from "./Jumbotron";
import Subotron from "./Subotron";
import InfoColumn from "./InfoColumn";
import $ from "jquery";


export default class ReactApp extends React.Component {
    constructor() {
        super();
            
        this.state = {
            user: {},
            auth: ""
        };
        
        this.getUser = this.getUser.bind(this);
    }
    
    getUser() {
        $.ajax({
          url: '/api/me',
          dataType: 'json',
          cache: false,
          success: data => {
            this.setState({
                user: data,
                displayName: data.github.displayName
              });
          },
          error: (xhr, status, err) => {
            console.error('/api/me', status, err.toString());
          }
        });
    }
    
    componentDidMount() {
        this.getUser();
    }
    
    render() {
        let data = [{
                name: "React.JS",
                className: "fa-code",
                description: "React Is A Javascript Library For Building User Interfaces"
            },
            {
                name: "Mongoose.JS",
                className: "fa-database",
                description: "Let's face it, writing MongoDB validation, casting and business logic boilerplate is a drag. That's why we wrote Mongoose. n\Mongoose provides a straight-forward, schema-based solution to model your application data. n\It includes built-in type casting, validation, query building, business logic hooks and more, out of the box."
            },
            {
                name: "Passport.JS",
                className:"fa-users",
                description: "Passport is authentication middleware for Node.js. Extremely flexible and modular, Passport can be unobtrusively dropped in to any Express-based web application. A comprehensive set of strategies support authentication using a username and password, Facebook, Twitter, and more."
            }];
      let infoNodes = data.map((datum, i) => {
        return (
          <InfoColumn key ={i} {...datum} />
        );
      });
      const user = JSON.stringify(this.state.user, null, 2);
        return (
            <div>
                <Nav />
                <Jumbotron displayName={this.state.displayName}/>
                <Subotron />
                <div className="container">{infoNodes}</div>
                <pre>{user}</pre>
            </div>
        );
    }
}