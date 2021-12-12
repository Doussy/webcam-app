const hasOwn = {}.hasOwnProperty;

export default function classNames(...args: Argument[]): string {
  const classes: string[] = [];

  args.forEach((arg) => {
    if (typeof arg === "string") {
      classes.push(arg);
    } else if (Array.isArray(arg) && arg.length) {
      const inner = classNames(...arg);

      if (inner) classes.push(inner);
    } else if (typeof arg === "object") {
      Object.keys(arg).forEach((key) => {
        if (hasOwn.call(arg, key) && arg[key]) {
          classes.push(key);
        }
      });
    }
  });

  return classes.join(" ");
}

type Argument = { [key: string]: boolean } | string;
