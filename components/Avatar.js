// @flow
import * as React from 'react';
import { Text } from '@visx/text';
import { Group } from '@visx/group';
import { LinearGradient } from '@visx/gradient';
import colorHash from '../lib/colorHash';

type AvatarProps = {|
  children: string,
  className?: string,
  overlap?: boolean,
|};

const Avatar = ({ children, overlap = false, ...rest }: AvatarProps) => {
  return (
    <svg
      className={['inline-block w-8 flex-initial', overlap ? '-ml-3' : ''].join(
        ' ',
      )}
      {...rest}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24">
      <Group>
        <LinearGradient
          to={colorHash(children).hex}
          from="#fbc2eb"
          id="gradient"
        />
        ;
        <circle
          cx="12"
          cy="12"
          r="10"
          // fill="url(#gradient)"
          fill={colorHash(children).hex}
          stroke="white"
          strokeWidth="1px"
        />
        <Text
          width={24}
          x={24 / 2}
          y={24 / 2}
          fill="white"
          style={{ fontSize: '80%' }}
          verticalAnchor="middle"
          textAnchor="middle">
          {children.charAt(0).toUpperCase()}
        </Text>
      </Group>
    </svg>
  );
};

export default (Avatar: React.StatelessFunctionalComponent<AvatarProps>);
