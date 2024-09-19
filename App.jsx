import { useState } from 'react';
import { View, Pressable, Image, Text } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';


GoogleSignin.configure({
	webClientId:'---',
	iosClientId: '---',
	scopes: ['profile', 'email'],
});

const GoogleLogin = async () => {
	await GoogleSignin.hasPlayServices();
	const userInfo = await GoogleSignin.signIn();
	return userInfo;
};

export default function App() {
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const [user, setUser]= useState('')

	const handleGoogleLogin = async () => {
		setLoading(true);
		try {
			const response = await GoogleLogin();
			const { idToken, user } = response.data;

			console.log('user...', user)
			setUser(user)
			/* if (idToken) {
				const resp = await authAPI.validateToken({
					token: idToken,
					email: user.email,
				});
				await handlePostLoginData(resp.data);
			} */
		} catch (apiError) {
			setError(
				apiError?.response?.data?.error?.message || 'Something went wrong'
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<View style={{margin:100}}>
			<Pressable onPress={handleGoogleLogin}><Text>Continue with Google</Text></Pressable>
			<Image style={{height:50, width:50}} resizeMode='cover' source={{uri:user?.photo}}/>
			<Text>{user?.name}</Text>
		</View>
	);
}
