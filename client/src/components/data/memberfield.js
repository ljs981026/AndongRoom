const MemberlistColumn = [
  { field: "num", headerName: "회원번호", width: 90 },
  {
    field: "id",
    headerName: "아이디",
    width: 150,
    editable: true,
  },
  {
    field: "password",
    headerName: "비밀번호",
    width: 150,
    editable: true,
  },
  {
    field: "name",
    headerName: "이름",
    width: 200,
    editable: true,
  },
  {
    field: "email",
    headerName: "이메일",
    width: 250,
    editable: true,
  },
  {
    field: "type",
    headerName: "회원유형",
    width: 110,
    editable: true,
  },
];

export default MemberlistColumn;
