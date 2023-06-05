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
    },
    {
      org: 138,
      branch: 'USMC',
      rank: '1stLt',
      l_name: 'Operations',
      f_name: 'Director',
      password: '$2b$10$4t0Vl2dVOj10aRKSB4LW/uBa4EoTMU2LOoG.1pZCp7UhhFhbyCYJW',
      email: 'grp3@grp3.comdirops@grp3.com',
      is_admin: false,
    },
    {
      org: 138,
      branch: 'USA',
      rank: 'CSM',
      l_name: 'SEL',
      f_name: 'SEL',
      password: '$2b$10$xH12sd9kv4G6VfiF7DfTOeClhddnrbwnMyPNOO9aXOS6CB5ra/oo2',
      email: 'sel@grp3.com',
      is_admin: true,
    },
    {
      org: 156,
      branch: 'USAF',
      rank: '1stLt',
      l_name: 'Sanchez',
      f_name: 'Rick',
      password: '$2b$10$S1gPdU737oEspI3R0RfoOOS/VLRINfvet4546YD9TXmZi8jiA.IyK',
      email: 'sq_cc@us.af.mil',
      is_admin: true,
    }
  ]
  )
};