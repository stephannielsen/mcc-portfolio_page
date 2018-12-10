using NUnit.Framework;
using Algorithms;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Algorithms.Tests
{
    [TestFixture]
    public class WhereforeArtThou_WhatIsInAName_Should
    {
        private WhereforeArtThou _whereforeArtThou;

        [SetUp]
        public void Setup()
        {
            _whereforeArtThou = new WhereforeArtThou();
        }

        [Test]
        public void ReturnFalseGivenValuesLessThan2()
        {
            var expected = new { First = "Tybalt", Last = "Capulet"};
            var collection = new [] { new { First = "Romeo", Last = "Montague"},
                new { First = "Mercutio", Last = (string)null},
                expected };
            var source = new { Last = "Capulet" };
            var result = _whereforeArtThou.WhatIsInAName(collection, source);
            Console.WriteLine(result.First().First, result.First().Last);
            Assert.IsTrue(false);
        }
    }
}