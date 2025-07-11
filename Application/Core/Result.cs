﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Core
{
    public class Result<T>
    {
        public bool IsSuccess;

        public string? Error { get; set; }

        public T? Value { get; set; }

        public int Code { get; set; }

        public static Result<T> Success(T value)
        {
            return new Result<T> { IsSuccess = true, Value = value };
        }

        public static Result<T> Failure(string error, int code = 500)
        {
            return new Result<T> { IsSuccess = false, Error = error, Code = code };
        }
    }
}
