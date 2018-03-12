import { IComment } from '../interfaces/comment';
import { IPost } from '../interfaces/post';
import { IUser } from '../interfaces/user';
import { commentMongoResource } from '../resources/comment/comment-mongo.resource';
import { postMongoResource } from '../resources/post/post-mongo.resource';
import { userMongoResource } from '../resources/user/user-mongo.resource';
import { mongoConnectionService } from '../services/mongo-connection/mongo-connection.service';
import { comments, posts, users } from './data';

// initialize fake data
(async function init() {
  console.log('Import start');
  const mUsers = await Promise.all(addUsers());
  console.log('addUsers done');
  const mPosts = await Promise.all(addPosts(mUsers));
  console.log('addPosts done');
  await Promise.all(addComments(mUsers, mPosts));
  console.log('addComments done');
  await Promise.all(addFriends(mUsers));
  console.log('addFriends done');
  console.log('Import done');
  mongoConnectionService.close();
})();

function addUsers() {
  const promises: Array<Promise<IUser>> = [];
  users.forEach(async (user) => {
    const uPromise = userMongoResource.addUser(user);
    promises.push(uPromise);
  });
  return promises;
}

function addPosts(mUsers: IUser[]) {
  const promises: Array<Promise<IPost>> = [];
  mUsers.forEach((u) => {
    const postNum = getRandomInt(1, 5);
    for (let pi = 0; pi < postNum; pi++) {
      const rpi = getRandomInt(0, posts.length);
      const pPromise = postMongoResource.createPost(u.id, posts[rpi].title, posts[rpi].content);
      promises.push(pPromise);
    }
  });
  return promises;
}

function addComments(mUsers: IUser[], mPosts: IPost[]) {
  const promises: Array<Promise<IComment>> = [];
  mPosts.forEach((p) => {
    const commensNum = getRandomInt(1, 10);
    for (let ci = 0; ci < commensNum; ci++) {
        const rci = getRandomInt(0, comments.length);
        const rui = getRandomInt(0, mUsers.length);
        const cPromise = commentMongoResource.createComment(p.id, mUsers[rui].id, comments[rci].content);
        promises.push(cPromise);
      }
  });
  return promises;
}

function addFriends(mUsers: IUser[]) {
  const promises: Array<Promise<IUser>> = [];
  mUsers.forEach(async (u) => {
    const friendsCount = getRandomInt(1, 10);
    for (let fi = 0; fi < friendsCount; fi++) {
      const rfi = getRandomInt(0, users.length - 1);
      const promise = userMongoResource.addFriend(u.id, mUsers[rfi].id);
      promises.push(promise);
    }
  });
  return promises;
}

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
