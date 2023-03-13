import { executeQuery } from './db';

export default function handler(req, res) {
    // DESC(내림차순), ASC(오름차순)
    const { method, body, query } = req;
    console.log(method)

    const selectGiftData = async () => {
        let { userLogin } = query;
        console.log(userLogin, '선물조회 get!!')

        let data = await executeQuery(
            'select * from GiftList where UserID=? order by UserID DESC', [userLogin]
        );
        res.json(data)

        // try {
        //     let data = await executeQuery("select * from GiftList where UserID=LoginUserID order by UserID DESC", [LoginUserID]);
        //     res.json(data)
        // } catch (err) {
        //     res.send(err);
        // }
    }

    const insertGiftData = async () => {
        let { UserID, title, image, price, state } = body;
        console.log(UserID, title)

        let data = await executeQuery(
            'insert into GiftList (UserID,title,image,price,state) value (?,?,?,?,?)',
            // 0 : true / 1 : false // true(0)면 선물완료니까 기본값으로 false(1)
            [UserID, title, image, price, state]
        );
        res.json(data)
    }

    switch (method) {
        case "GET": selectGiftData(); break;
        case "POST": insertGiftData(); break;
    }
}

//  #2.  method를 통해, 접속하는데 *(전체) from teamDbList(지정한 db파일이름)

///////////////////////////////////////////////

////////////////////////////////////////////////////