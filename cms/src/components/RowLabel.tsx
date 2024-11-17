type RowLabelProps = {
  data: any;
  propName: string;
};

export function RowLabel({ data, propName }: RowLabelProps) {
  return data[propName];
}
