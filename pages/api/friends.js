import { executeQuery } from './db';

export default function handler(req, res) {
    // DESC(내림차순), ASC(오름차순)
    const { method, body } = req;

    const selectFriendsData = async () => {
        try {
            let data = await executeQuery('select * from FriendsList where UserID=10 order by UserID DESC', []);
            res.json(data)
        } catch (err) {
            res.send(err);
        }
    }

    const insertFriendsData = async () => {
        let { UserID, title, image, price, state } = body;

        let data = await executeQuery(
            'insert into teamDbProductList (UserID,title,image,price,state) value (?,?,?,?,?)',
            // 0 : true / 1 : false // true(1)면 선물완료니까 기본값으로 false(0)
            [UserID, title, image, price, state]
        );
        res.json(data)
    }

    switch (method) {
        case "GET": selectFriendsData(); break;
        case "POST": insertFriendsData(); break;
    }
}

//  #2.  method를 통해, 접속하는데 *(전체) from teamDbList(지정한 db파일이름)

///////////////////////////////////////////////








////////////////////////////////////////////////////