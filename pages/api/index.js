import { executeQuery } from './db';

export default function handler(req, res) {
  // DESC(내림차순), ASC(오름차순)
  const { method, body } = req;

  const selectData = async () => {
    try {
      let data = await executeQuery('select * from teamDbList order by id DESC', []);
      res.json(data)
    } catch (err) {
      res.send(err);
    }
  }

  const insertData = async () => {
    let { name, email, tel } = body;

    let data = await executeQuery(
      'insert into teamDbList (itemId,itemName,itemImgUrl) value (?,?,?)',
      [name, email, tel]
    );
    res.json(data)
  }

  switch (method) {
    case "GET": selectData(); break;
    case "POST": insertData(); break;
  }
}

//  #2.  method를 통해, 접속하는데 *(전체) from teamDbList(지정한 db파일이름)
