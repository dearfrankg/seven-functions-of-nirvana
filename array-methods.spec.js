describe('ARRAY METHODS', () => {
  const array = [1, 2, 3, 4]

  describe('reduce', () => {
    it('should reduce', () => {
      const expectedResult = array.reduce((a, c) => a + c, 0)
      expect(expectedResult).toEqual(10)
    })
  })

  describe('forEach', () => {
    it('should traverse', () => {
      const result = []
      array.forEach((x) => result.push(x * x))
      expect(result).toEqual([1,4,9,16])
    })
  })

  describe('filter', () => {
    it('should filter', () => {
      expect(array.filter((x) => x < 3)).toEqual([1,2])
    })
  })

  describe('map', () => {
    it('should project', () => {
      expect(array.map((x) => x * x * x)).toEqual([1,8,27,64])
    })
  })

  describe('concatAll', () => {
    it('should concat an array of arrays', () => {
      expect([array, array].concatAll()).toEqual([1,2,3,4,1,2,3,4])
    })
  })

  describe('concatMap', () => {
    it('should map returning an array of arrays then concat them', () => {
      expect(array.concatMap((x) => [x * 2])).toEqual([2,4,6,8])
    })
  })

  describe('zip', () => {
    it('should merge two arrays', () => {
      const expectedResult = [ { x : 1, y : 1 }, { x : 2, y : 2 }, { x : 3, y : 3 }, { x : 4, y : 4 } ]
      expect(Array.zip(array, array, (a, b) => ({x:a, y:b}))).toEqual(expectedResult)
    })
  })

})
