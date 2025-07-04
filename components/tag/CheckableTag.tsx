import classNames from 'classnames';
import * as React from 'react';
import { ConfigContext } from '../config-provider';

export interface CheckableTagProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  /**
   * It is an absolute controlled component and has no uncontrolled mode.
   *
   * .zh-cn 该组件为完全受控组件，不支持非受控用法。
   */
  checked: boolean;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  onChange?: (checked: boolean) => void;
  onClick?: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
}

const CheckableTag: React.FC<CheckableTagProps> = ({
  prefixCls: customizePrefixCls,
  className,
  checked,
  icon,
  onChange,
  onClick,
  ...restProps
}) => {
  const { getPrefixCls } = React.useContext(ConfigContext);

  const handleClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    onChange?.(!checked);
    onClick?.(e);
  };

  const prefixCls = getPrefixCls('tag', customizePrefixCls);
  const cls = classNames(
    prefixCls,
    {
      [`${prefixCls}-checkable`]: true,
      [`${prefixCls}-checkable-checked`]: checked,
    },
    className,
  );
  const iconNode = icon || null;

  const kids = iconNode ? (
    <>
      {iconNode}
      <span>{restProps.children}</span>
    </>
  ) : (
    restProps.children
  );

  return (
    <span {...restProps} className={cls} onClick={handleClick}>
      {kids}
    </span>
  );
};

export default CheckableTag;
