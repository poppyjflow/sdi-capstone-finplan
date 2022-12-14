const ranks = {
  usaf: [
    {
      rank: 'Airman Basic',
      abbr: 'AB'
    },
    {
      rank: 'Airman',
      abbr: 'Amn'
    },
    {
      rank: 'Airman First Class',
      abbr: 'A1C'
    },
    {
      rank: 'Senior Airman',
      abbr: 'SrA'
    },
    {
      rank: 'Staff Sergeant',
      abbr: 'SSgt'
    },
    {
      rank: 'Tech Sergeant',
      abbr: 'TSgt'
    },
    {
      rank: 'Master Sergeant',
      abbr: 'MSgt'
    },
    {
      rank: 'Senior Master Sergeant',
      abbr: 'SMSgt'
    },
    {
      rank: 'Chief Master Sergeant',
      abbr: 'CMSgt'
    },
    {
      rank: 'Chief Master Sergeant of the Air Force',
      abbr: 'CMSAF',
    },
    {
      rank: 'Second Lieutenant',
      abbr: '2d Lt'
    },
    {
      rank: 'First Lieutenant',
      abbr: '1st Lt',
    },
    {
      rank: 'Captain',
      abbr: 'Capt'
    },
    {
      rank: 'Major',
      abbr: 'Maj'
    },
    {
      rank: 'Lieutenant Colonel',
      abbr: 'Lt Col'
    },
    {
      rank: 'Colonel',
      abbr: 'Col'
    },
    {
      rank: 'Brigadier General',
      abbr: 'Brig Gen'
    },
    {
      rank: 'Major General',
      abbr: 'Maj Gen'
    },
    {
      rank: 'Lieutenant General',
      abbr: 'Lt Gen'
    },
    {
      rank: 'General',
      abbr: 'Gen'
    }
  ],

  ussf: [
    {
      rank: 'Specialist 1',
      abbr: 'Spc1'
    },
    {
      rank: 'Specialist 2',
      abbr: 'Spc2'
    },
    {
      rank: 'Specialist 3',
      abbr: 'Spc3'
    },
    {
      rank: 'Specialist 4',
      abbr: 'Spc4'
    },
    {
      rank: 'Sergeant',
      abbr: 'Sgt'
    },
    {
      rank: 'Tech Sergeant',
      abbr: 'TSgt'
    },
    {
      rank: 'Master Sergeant',
      abbr: 'MSgt'
    },
    {
      rank: 'Senior Master Sergeant',
      abbr: 'SMSgt'
    },
    {
      rank: 'Chief Master Sergeant',
      abbr: 'CMSgt'
    },
    {
      rank: 'Chief Master Sergeant of the Space Force',
      abbr: 'CMSSF',
    },
    {
      rank: 'Second Lieutenant',
      abbr: '2d Lt'
    },
    {
      rank: 'First Lieutenant',
      abbr: '1st Lt',
    },
    {
      rank: 'Captain',
      abbr: 'Capt'
    },
    {
      rank: 'Major',
      abbr: 'Maj'
    },
    {
      rank: 'Lieutenant Colonel',
      abbr: 'Lt Col'
    },
    {
      rank: 'Colonel',
      abbr: 'Col'
    },
    {
      rank: 'Brigadier General',
      abbr: 'Brig Gen'
    },
    {
      rank: 'Major General',
      abbr: 'Maj Gen'
    },
    {
      rank: 'Lieutenant General',
      abbr: 'Lt Gen'
    },
    {
      rank: 'General',
      abbr: 'Gen'
    }
  ],

  usmc: [
    {
      rank: 'Private',
      abbr: 'PVT'
    },
    {
      rank: 'Private First Class',
      abbr: 'PFC'
    },
    {
      rank: 'Lance Corproal',
      abbr: 'LCpl'
    },
    {
      rank: 'Corporal',
      abbr: 'Cpl'
    },
    {
      rank: 'Sergeant',
      abbr: 'Sgt'
    },
    {
      rank: 'Staff Sergeant',
      abbr: 'SSgt'
    },
    {
      rank: 'Gunnery Sergeant',
      abbr: 'GySgt'
    },
    {
      rank: 'Master Sergeant',
      abbr: 'MSgt'
    },
    {
      rank: 'First Sergeant',
      abbr: '1st Sgt',
    },
    {
      rank: 'Master Gunnery Sergeant',
      abbr: 'MGySgt',
    },
    {
      rank: 'Sergeant Major',
      abbr: 'SgtMaj',
    },
    {
      rank: 'Sergeant Major of the Marine Corps',
      abbr: 'SMMC',
    },
    {
      rank: 'Second Lieutenant',
      abbr: '2ndLt'
    },
    {
      rank: 'First Lieutenant',
      abbr: '1stLt',
    },
    {
      rank: 'Captain',
      abbr: 'Capt'
    },
    {
      rank: 'Major',
      abbr: 'Maj'
    },
    {
      rank: 'Lieutenant Colonel',
      abbr: 'LtCol'
    },
    {
      rank: 'Colonel',
      abbr: 'Col'
    },
    {
      rank: 'Brigadier General',
      abbr: 'BGen'
    },
    {
      rank: 'Major General',
      abbr: 'MajGen'
    },
    {
      rank: 'Lieutenant General',
      abbr: 'LtGen'
    },
    {
      rank: 'General',
      abbr: 'Gen'
    }

  ],
  usa: [

    {
      rank: 'Private',
      abbr: 'PV',
    },
    {
      rank: 'Private',
      abbr: 'PV2',
    },
    {
      rank: 'Private First Class',
      abbr: 'PFC',
    },
    {
      rank: 'Corporal',
      abbr: 'CPL',
    },
    {
      rank: 'Specialist',
      abbr: 'SPC',
    },
    {
      rank: 'Sergeant',
      abbr: 'SGT',
    },
    {
      rank: 'Staff Sergeant',
      abbr: 'SSG',
    },
    {
      rank: 'Sergeant First Class',
      abbr: 'SFC',
    },
    {
      rank: 'Master Sergeant',
      abbr: 'MSG',
    },
    {
      rank: 'First Sergeant',
      abbr: '1SG',
    },
    {
      rank: 'Sergeant Major',
      abbr: 'SGM',
    },
    {
      rank: 'Command Sergeant Major',
      abbr: 'CSM',
    },
    {
      rank: 'Sergeant Major of the Army',
      abbr: 'SMA',
    },
    {
      rank: 'Warrant Officer 1',
      abbr: 'WO1',
    },
    {
      rank: 'Chief Warrant Officer 2',
      abbr: 'WO2',
    },
    {
      rank: 'Chief Warrant Officer 3',
      abbr: 'WO3',
    },
    {
      rank: 'Chief Warrant Officer 4',
      abbr: 'WO2',
    },
    {
      rank: 'Chief Warrant Officer 5',
      abbr: 'WO5',
    },
    {
      rank: 'Second Lieutenant',
      abbr: '2LT',
    },
    {
      rank: 'First Lieutenant',
      abbr: '1LT',
    },
    {
      rank: 'Captain',
      abbr: 'CPT',
    },
    {
      rank: 'Major',
      abbr: 'MAJ',
    },
    {
      rank: 'Lieutenant Colonel',
      abbr: 'LTC',
    },
    {
      rank: 'Colonel',
      abbr: 'COL',
    },
    {
      rank: 'Brigadier General',
      abbr: 'BG',
    },
    {
      rank: 'Major General',
      abbr: 'MG',
    },
    {
      rank: 'Lieutenant General',
      abbr: 'LTG',
    },
    {
      rank: 'General',
      abbr: 'Gen',
    }
  ],

  usn: [
    {
      rank: 'Seaman Recruit',
      abbr: 'SR'
    },
    {
      rank: 'Seaman Apprentice',
      abbr: 'SA'
    },
    {
      rank: 'Seaman',
      abbr: 'SN'
    },
    {
      rank: 'Petty Officer Third Class',
      abbr: 'PO3'
    },
    {
      rank: 'Petty Officer Second Class',
      abbr: 'PO2'
    },
    {
      rank: 'Petty Officer First Class',
      abbr: 'PO1'
    },
    {
      rank: 'Chief Petty Officer',
      abbr: 'CPO'
    },
    {
      rank: 'Senior Chief Petty Officer',
      abbr: 'SCPO'
    },
    {
      rank: 'Master Chief Petty Officer',
      abbr: 'MCPO'
    },
    {
      rank: 'Command Master Chief Petty Officer',
      abbr: 'CMC'
    },
    {
      rank: 'Master Chief Petty Officer Of The Navy',
      abbr: 'MCPON'
    },
    {
      rank: 'Chief Warrant Officer 2',
      abbr: 'CWO2'
    },
    {
      rank: 'Chief Warrant Officer 3',
      abbr: 'CWO3'
    },
    {
      rank: 'Chief Warrant Officer 4',
      abbr: 'CWO4',
    },
    {
      rank: 'Ensign',
      abbr: 'ENS',
    },
    {
      rank: 'Lieutenant Junior Grade',
      abbr: 'LTJG',
    },
    {
      rank: 'Lieutenant',
      abbr: 'LT',
    },
    {
      rank: 'Lieutenant Commander',
      abbr: 'LCDR',
    },
    {
      rank: 'Commander',
      abbr: 'CDR',
    },
    {
      rank: 'Captain',
      abbr: 'CAPT',
    },
    {
      rank: 'Rear Admiral Lower Half',
      abbr: 'RADM',
    },
    {
      rank: 'Rear Admiral Upper Half',
      abbr: 'RADM',
    },
    {
      rank: 'Vice Admiral',
      abbr: 'VADM',
    },
    {
      rank: 'Admiral',
      abbr: 'ADM',
    }
  ],
  uscg: [
    {
      rank: 'Seaman Recruit',
      abbr: 'SR'
    },
    {
      rank: 'Seaman Apprentice',
      abbr: 'SA'
    },
    {
      rank: 'Seaman',
      abbr: 'SN'
    },
    {
      rank: 'Petty Officer Third Class',
      abbr: 'PO3'
    },
    {
      rank: 'Petty Officer Second Class',
      abbr: 'PO2'
    },
    {
      rank: 'Petty Officer First Class',
      abbr: 'PO1'
    },
    {
      rank: 'Chief Petty Officer',
      abbr: 'CPO'
    },
    {
      rank: 'Senior Chief Petty Officer',
      abbr: 'SCPO'
    },
    {
      rank: 'Master Chief Petty Officer',
      abbr: 'MCPO'
    },
    {
      rank: 'Command Master Chief Petty Officer',
      abbr: 'CMC'
    },
    {
      rank: 'Master Chief Petty Officer Of The Coast Guard',
      abbr: 'MCPOC'
    },
    {
      rank: 'Chief Warrant Officer 2',
      abbr: 'CWO-2'
    },
    {
      rank: 'Chief Warrant Officer 3',
      abbr: 'CWO-3'
    },
    {
      rank: 'Chief Warrant Officer 4',
      abbr: 'CWO-4'
    },
    {
      rank: 'Ensign',
      abbr: 'ENS'
    },
    {
      rank: 'Lieutenant Junior Grade',
      abbr: 'LTJG'
    },
    {
      rank: 'Lieutenant',
      abbr: 'LT'
    },
    {
      rank: 'Lieutenant Commander',
      abbr: 'LCDR'
    },
    {
      rank: 'Commander',
      abbr: 'CDR'
    },
    {
      rank: 'Captain',
      abbr: 'CAPT'
    },
    {
      rank: 'Rear Admiral Lower Half',
      abbr: 'DRML'
    },
    {
      rank: 'Rear Admiral',
      abbr: 'RADM'
    },
    {
      rank: 'Vice Admiral',
      abbr: 'VADM'
    },
    {
      rank: 'Admiral',
      abbr: 'ADM'
    }
  ],
  Civ: [
    {
      rank: 'GS-1',
      abbr: 'GS-1',
    },
    {
      rank: 'GS-2',
      abbr: 'GS-2',
    },
    {
      rank: 'GS-3',
      abbr: 'GS-3',
    },
    {
      rank: 'GS-4',
      abbr: 'GS-4',
    },
    {
      rank: 'GS-5',
      abbr: 'GS-5',
    },
    {
      rank: 'GS-6',
      abbr: 'GS-6',
    },
    {
      rank: 'GS-7',
      abbr: 'GS-7',
    },
    {
      rank: 'GS-8',
      abbr: 'GS-8',
    },
    {
      rank: 'GS-9',
      abbr: 'GS-9',
    },
    {
      rank: 'GS-10',
      abbr: 'GS-10',
    },
    {
      rank: 'GS-11',
      abbr: 'GS-11',
    },
    {
      rank: 'GS-12',
      abbr: 'GS-12',
    },
    {
      rank: 'GS-13',
      abbr: 'GS-13',
    },
    {
      rank: 'GS-14',
      abbr: 'GS-14',
    },
    {
      rank: 'GS-15',
      abbr: 'GS-15',
    },
  ],
};

export default ranks;