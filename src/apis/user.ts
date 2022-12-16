import { USER_URL } from './request';

export function getUser(params: any) {
  return USER_URL({
    url: `/getuser/${params.id}`,
    method: 'get',
  });
}

export function getAllUser() {
  return USER_URL({
    url: `/getalluser`,
    method: 'get',
  });
}

export function delUser(params: any) {
  return USER_URL({
    url: `/deluser`,
    method: 'delete',
    data: params,
  });
}
export function updateUser(params: any) {
  return USER_URL({
    url: `/updateuser`,
    method: 'post',
    data: params,
  });
}
