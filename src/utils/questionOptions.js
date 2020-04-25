export const optionsType = [
    {
        title: '选择题',
        key: 1,
        options: [
            {
                title: '单选',
                key: 'd01'
            },
            {
                title: '多选',
                key: 'd02'
            }
        ]
    },
    {
        title: '填空题',
        key: 2,
        options: [
            {
                title: '单选填空',
                key: 'd01'
            },
            {
                title: '多选填空',
                key: 'd02'
            }
        ]
    },
    {
        title: '分页说明',
        key: 3,
        options: [
            {
                title: '单选',
                key: 'd01'
            },
            {
                title: '多选',
                key: 'd02'
            }
        ]
    }
];

export const optionsTemplate = {
    // 单选题
    d01: (index) => ({
        title: '',
        type: 'd01',
        require: false,
        isEdit: true,
        heckValue: '',
        options: [
            {
                label: '',
                value: index + 1
            },
            {
                label: '',
                value: index + 2
            }
        ]
    })
};
