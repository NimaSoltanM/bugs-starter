const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());

app.use(
  cors({
    origin: '*',
  })
);

let bugs = [
  {
    id: 1,
    title: 'سایت در هنگام ورود دچار خطا می شود',
    priority: 'بالا',
    status: 'جدید',
  },
  {
    id: 2,
    title: 'محاسبه سبد خرید نادرست است',
    priority: 'متوسط',
    status: 'جدید',
  },
  {
    id: 3,
    title: 'تغییرات ظاهری اعمال نشده است',
    priority: 'پایین',
    status: 'جدید',
  },
  {
    id: 4,
    title: 'بارگذاری تصویر کار نمی کند',
    priority: 'بالا',
    status: 'جدید',
  },
];

let lastBugId = bugs.length;

app.get('/bugs', (req, res) => {
  let filteredBugs = [...bugs];

  if (req.query.title) {
    filteredBugs = filteredBugs.filter((b) =>
      b.title.includes(req.query.title)
    );
  }

  res.json(filteredBugs);
});

app.post('/bugs', (req, res) => {
  const { title, priority } = req.body;

  if (!title || !priority) {
    return res.status(400).send('همه ی فیلد را تکمیل کنید');
  }

  const bug = {
    id: ++lastBugId,
    title: req.body.title,
    priority: req.body.priority,
    status: 'جدید',
  };

  bugs.push(bug);

  res.status(201).json(bug);
});

app.patch('/bugs/:id', (req, res) => {
  const bugId = req.params.id;
  const update = req.body;

  const bug = bugs.find((b) => b.id == bugId);

  if (bug) {
    // Update status and priority
    bug.status = update.status;
    res.status(200).json(bug);
  } else {
    res.status(404).send('Bug not found');
  }
});

app.delete('/bugs/:id', (req, res) => {
  const bugId = req.params.id;

  const index = bugs.findIndex((b) => b.id == bugId);

  if (index != -1) {
    bugs.splice(index, 1);
    res.status(200).send('باگ حذف شد .');
  } else {
    res.status(404).send('باگ پیدا نشد !');
  }
});

// Listen on port
const port = 3001;
app.listen(port, () => console.log(`App listening on port ${port}`));
