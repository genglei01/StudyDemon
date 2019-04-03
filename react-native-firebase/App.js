import React from "react";
import * as firebase from "firebase";

import { Text,StyleSheet} from "react-native";
import { Container, Item, Form, Input, Button, Label } from "native-base";

const config = {
	apiKey: "AIzaSyByni0UdQdQWJoZeqGZgHkexCUoLifFtI4",
	authDomain: "react-native-firebase-dc8b2.firebaseapp.com",
	databaseURL: "https://react-native-firebase-dc8b2.firebaseio.com",
	projectId: "react-native-firebase-dc8b2",
	storageBucket: "react-native-firebase-dc8b2.appspot.com",
	messagingSenderId: "175003516523"
};
firebase.initializeApp(config);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		// alignItems: "center",
		justifyContent: "center"
	}
});

export default class App extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			email:"",
			password:""
		};
	}

	signUp = (email,password)=>{
		try {
			firebase.auth().createUserWithEmailAndPassword(email,password);
		} catch (error) {
			console.log(error);
		}
  }

  signIn = ()=>{
    const {email,password} = this.state;
    try {
      firebase.auth().signInWithEmailAndPassword(email,password);
      firebase.auth().onAuthStateChanged((user)=>{
        alert(user.email)
      })
    } catch (error) {
      console.log(error)
    }
  }

	render() {
		return (
			<Container style={styles.container}>
				<Form>
					<Item floatingLabel>
						<Label>Email</Label>
						<Input autoCapitalize="none" autoCorrect={false} onChangeText={email=>this.setState({email})}></Input>
					</Item>
					<Item floatingLabel>
						<Label>Password</Label>
						<Input secureTextEntry={true} autoCapitalize="none" autoCorrect={false} onChangeText={password=>this.setState({password})}></Input>
					</Item>
					<Button full rounded onPress={this.signIn}>
						<Text>SignIn</Text>
					</Button>
					<Button full rounded success style={{marginTop: 20}} onPress={()=>this.signUp(this.state.email,this.state.password)}>
						<Text>Signup</Text>
					</Button>
				</Form>
			</Container>
		);
	}
}

