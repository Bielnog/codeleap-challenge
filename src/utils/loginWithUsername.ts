import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  getAuth,
  type User,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  addDoc,
} from "firebase/firestore";

const auth = getAuth();
const db = getFirestore();

export async function loginWithUsername(
  email: string,
  password: string,
  username: string
): Promise<User> {
  const usersRef = collection(db, "users");

  const usernameQuery = query(usersRef, where("username", "==", username));
  const usernameSnapshot = await getDocs(usernameQuery);
  if (!usernameSnapshot.empty) throw new Error("Username already exists");

  const emailQuery = query(usersRef, where("email", "==", email));
  const emailSnapshot = await getDocs(emailQuery);
  if (!emailSnapshot.empty) throw new Error("Email already registered");

  const credential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = credential.user;

  await updateProfile(user, { displayName: username });
  await addDoc(usersRef, {
    uid: user.uid,
    username,
    email,
    createdAt: new Date(),
  });
  return user;
}

export async function signInWithCredentials(
  email: string,
  password: string
): Promise<User> {
  const credential = await signInWithEmailAndPassword(auth, email, password);
  return credential.user;
}
