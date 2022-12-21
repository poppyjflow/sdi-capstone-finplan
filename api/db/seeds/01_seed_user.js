exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del();
  await knex('users').insert([
    {
      org: 138,
      branch: 'USAF',
      rank: 'CMSgt',
      l_name: 'grp3',
      f_name: 'grp3',
      password: '$2b$10$S1gPdU737oEspI3R0RfoOOS/VLRINfvet4546YD9TXmZi8jiA.IyK',
      email: 'grp3@grp3.com',
      is_admin: false,
    }]
  )
};