import { Space, Table, Tag } from "antd";
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "loser") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];
const data = [
  {
    key: "1",
    name: "Md. Sakib-Ul-Alam (NAME 1)",
    position: "President",
    tags: ["leader"],
  },
  {
    key: "2",
    name: "Kazi Rafi Rahaman (NAME 2)",
    position: "Vice President",
    tags: ["vice"],
  },
  {
    key: "3",
    name: "Hasan Ruhan Rabbi (NAME 2)",
    position: "Vice President",
    tags: ["vice"],
  },
  {
    key: "4",
    name: "Tania Tamiz Tanny (NAME 1)",
    position: "General Secretary",
    tags: ["secretary"],
  },
  {
    key: "5",
    name: "Tasmia Hoque (NAME 3)",
    position: "General Secretary",
    tags: ["secretary"],
  },
  {
    key: "6",
    name: "Lt Cdr Khalid (NAME 1)",
    position: "Secretary (Finance)",
    tags: ["finance"],
  },
  {
    key: "7",
    name: "Shahan Malek Usham (NAME 5)",
    position: "Secretary (Finance)",
    tags: ["finance"],
  },
  {
    key: "8",
    name: "Tamanna Tasnim (NAME 3)",
    position: "Secretary (Administration)",
    tags: ["admin"],
  },
  {
    key: "9",
    name: "Farhan Mahmud Raffi (NAME 3)",
    position: "Secretary (Social & Cultural)",
    tags: ["social"],
  },
  {
    key: "10",
    name: "Fida Mashfiha (NAME 5)",
    position: "Secretary (Social & Cultural)",
    tags: ["social"],
  },
  {
    key: "11",
    name: "Lt Col Haidar (NAME 3)",
    position: "Advising Member",
    tags: ["advising"],
  },
  {
    key: "12",
    name: "Lt Cdr Yusuf (NAME 1)",
    position: "Advising Member",
    tags: ["advising"],
  },
  {
    key: "13",
    name: "Lt Cdr Hakikul (NAME 1)",
    position: "Advising Member",
    tags: ["advising"],
  },
];
const ExecutiveMembers = () => <Table columns={columns} dataSource={data} />;
export default ExecutiveMembers;
