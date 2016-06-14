describe('app', function () {
    'use strict';

    var app = window.app;

    describe('generateMessage', function () {
        it('should validate isPalidrome and count vowels', function () {
            expect(app.generateMessage("ala")).toEqual({vowel: 2, palindrome: true});
        });
        it('should validate isPalidrome and count vowels', function () {
            expect(app.generateMessage("aladyn")).toEqual({vowel: 3, palindrome: false});
        });
    });

    describe('isPalindrome', function () {

        describe('toHaveBeenCalled', function () {
            beforeAll(function (){
                spyOn(app, 'isPalindrome');
                app.isPalindrome('ala');
            });
            it('should call isPalindrome function', function() {
                expect(app.isPalindrome).toHaveBeenCalled();
                expect(app.isPalindrome).toHaveBeenCalledWith('ala');
            });
        });

        describe('and.callThrough', function () {
            beforeAll(function (){
                spyOn(app, 'isPalindrome').and.callThrough();
                app.generateMessage('ala');
            });
            it('should call isPalindrome function when generateMessage is called', function() {
                expect(app.isPalindrome).toHaveBeenCalled();
                expect(app.isPalindrome).toHaveBeenCalledWith('ala');
            });
        });

        describe('and.returnValue', function () {
            var val;
            beforeAll(function (){
                spyOn(app, 'isPalindrome').and.returnValue(true);
            });
            it('should call isPalindrome function and return true', function() {
                val = app.isPalindrome('ala');
                expect(val).toBe(true);
            });
            it('should call generateMessage and isPalindrome functions, result should equal true', function() {
                val = app.generateMessage('ala');
                expect(val).toEqual({vowel: 2, palindrome: true});
            });
        });

        describe('and.callFake', function () {
            var pointer;
            beforeAll(function(){
                spyOn(app, 'isPalindrome').and.callFake(function(str){
                    var strTemp = str.toLowerCase(),
                        strLength = strTemp.length;
                    if (str === '') {
                        return false;
                    }
                    var halfLength = (strLength % 2 === 0) ? (strLength / 2) : ((strLength - 1) / 2);
                    for (var i = 0; i < halfLength; i++) {
                        if (strTemp[i] !== strTemp.slice(-1 - i)[0]) {
                            return false;
                        }
                    }
                    return true
                });
                it('should call isPalnidrom fake function', function() {
                    pointer=app.toLowerCase('ala');
                    expect(pointer).toBe('ala');
                });
                it('should call generateMessage fake function', function() {
                    pointer=app.generateMessage('ala');
                    expect(pointer).toEqual({ vowel: 2, palindrome: true });
                });
            });
        });

        describe('calls.count()', function () {
            var wynik;
            beforeAll(function (){
                spyOn(app, 'isPalindrome').and.callThrough;
            });
            it('should notice that isPalindrome is call', function() {
                wynik = app.isPalindrome('ala');
                expect(app.isPalindrome.calls.count()).toBe(1);
            });
            it('should notice that isPalindrome function is call, when generateMessage is call', function() {
                wynik = app.generateMessage('ala');
                expect(app.isPalindrome.calls.count()).toEqual(2);
            });
        });
    });

    describe('vowelCount', function () {

        describe('toHaveBeenCalled', function () {
            beforeAll(function (){
                spyOn(app, 'vowelCount');
                app.vowelCount('ala');
            });
            it('should call vowelCount function', function() {
                expect(app.vowelCount).toHaveBeenCalled();
                expect(app.vowelCount).toHaveBeenCalledWith('ala');
            });
        });

        describe('and.callThrough', function () {
            beforeAll(function (){
                spyOn(app, 'vowelCount').and.callThrough();
                app.generateMessage('ala');
            });
            it('should call vowelCount function' + 'when generateMessage is call', function() {
                expect(app.vowelCount).toHaveBeenCalled();
                expect(app.vowelCount).toHaveBeenCalledWith('ala');
            });
        });

        describe('and.returnValue', function () {
            var wynik;
            beforeAll(function (){
                spyOn(app, 'vowelCount').and.returnValue(2);
            });
            it('should call vowelCount function and return true', function() {
                wynik = app.vowelCount('ala');
                expect(wynik).toBe(2);
            });
            it('should call generateMessage and vowelCount functions, result should be equal 2', function() {
                wynik = app.generateMessage('ala');
                expect(wynik).toEqual({vowel: 2, palindrome: true});
            });
        });

        describe('and.callFake', function () {
            var pointer;
            beforeAll(function(){
                spyOn(app, 'vowelCount').and.callFake(function(str){
                    var vowelList = 'aeiouyAEIOUY',
                        vovCount = 0;
                    for (var i = 0, strLength = str.length; i < strLength; i++) {
                        if (vowelList.indexOf(str[i]) !== -1) {
                            vovCount++;
                        }
                    }
                    return vovCount;
                });
                it('should call vowelCount fake function', function() {
                    pointer=app.vowelCount('ala');
                    expect(pointer).toBe('ala');
                });
                it('should call generateMessage fake function', function() {
                    pointer=app.generateMessage('ala');
                    expect(pointer).toEqual({ vowel: 2, palindrome: true });
                });
            });
        });

        describe('calls.count()', function () {
            var wynik;
            beforeAll(function (){
                spyOn(app, 'vowelCount').and.callThrough;
            });
            it('should notice that isPalindrome is call', function() {
                wynik = app.vowelCount('ala');
                expect(app.vowelCount.calls.count()).toBe(1);
            });
            it('should notice that vowelCount function is call, when generateMessage is call', function() {
                wynik = app.generateMessage('ala');
                expect(app.vowelCount.calls.count()).toEqual(2);
            });
        });
    });
});

