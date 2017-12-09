// ajax
export const CODE_SUCCESS = '000000'
const userTypes = [
  { value: '1',
    label: '学生'
  },
  { value: '2',
    label: '教职工'
  },
  { value: '3',
    label: '教职工家属'
  },
  { value: '4',
    label: '校友/合作'
  },
  { value: '5',
    label: '校外人员'
  }
]
const sexbooks  = {
  "0":"未知",
  "1":"男",
  "2":"女"
}
window.userTypes = userTypes || [];
window.sexbooks = sexbooks || {};
