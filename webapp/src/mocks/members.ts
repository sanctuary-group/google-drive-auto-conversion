import type { Member } from "./types";

export const members: Member[] = [
  // マスター管理者(運営側)
  { id: "m-sct-1", name: "稲葉 翔", email: "inaba@sanctuary.example", role: "master", lastLoginAt: "2026-06-09 10:14", avatarSeed: 1 },
  { id: "m-sct-2", name: "佐藤 健介", email: "sato@sanctuary.example", role: "master", lastLoginAt: "2026-06-08 19:02", avatarSeed: 2 },

  // テナント管理者(株式会社スカイ)
  { id: "m-sky-admin-1", tenantId: "tenant-sky", name: "山本 智也", email: "yamamoto@sky.example", role: "master", lastLoginAt: "2026-06-09 09:32", avatarSeed: 3 },
  { id: "m-sky-admin-2", tenantId: "tenant-sky", name: "三好 麻里", email: "miyoshi@sky.example", role: "master", lastLoginAt: "2026-06-08 18:11", avatarSeed: 4 },

  // 会社マネージャー(株式会社スカイ)
  { id: "m-sky-mgr-1", tenantId: "tenant-sky", name: "竹下 直樹", email: "takeshita@sky.example", role: "manager", lastLoginAt: "2026-06-09 08:55", avatarSeed: 5 },
  { id: "m-sky-mgr-2", tenantId: "tenant-sky", name: "石川 正", email: "ishikawa@sky.example", role: "manager", lastLoginAt: "2026-06-08 17:40", avatarSeed: 6 },

  // 会社ユーザー(株式会社スカイ)
  { id: "m-sky-u-1", tenantId: "tenant-sky", name: "永田 晶子", email: "nagata@sky.example", role: "user", lastLoginAt: "2026-06-09 11:01", avatarSeed: 8 },
  { id: "m-sky-u-2", tenantId: "tenant-sky", name: "塩崎 弘美", email: "shiozaki@sky.example", role: "user", lastLoginAt: "2026-06-08 16:10", avatarSeed: 9 },
  { id: "m-sky-u-3", tenantId: "tenant-sky", name: "桐生 健志", email: "kiryu@sky.example", role: "user", lastLoginAt: "2026-06-06 09:08", avatarSeed: 10 },
  { id: "m-sky-u-4", tenantId: "tenant-sky", name: "奥名 貴士", email: "okuna@sky.example", role: "user", lastLoginAt: "2026-06-05 12:30", avatarSeed: 11 },
  { id: "m-sky-u-5", tenantId: "tenant-sky", name: "山本 朋実", email: "tomomi@sky.example", role: "user", lastLoginAt: "2026-06-03 18:42", avatarSeed: 12 },

  // 他テナント
  { id: "m-demo-a-mgr", tenantId: "tenant-demo-a", name: "Demo A マネージャー", email: "mgr@demo-a.example", role: "manager", lastLoginAt: "2026-06-08 11:00", avatarSeed: 13 },
  { id: "m-demo-b-mgr", tenantId: "tenant-demo-b", name: "Demo B マネージャー", email: "mgr@demo-b.example", role: "manager", lastLoginAt: "2026-06-08 09:00", avatarSeed: 14 },
];

export function getMembersByTenant(tenantId: string) {
  return members.filter((m) => m.tenantId === tenantId);
}
