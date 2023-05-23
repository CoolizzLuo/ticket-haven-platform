import { Link } from '@chakra-ui/next-js';
import { Text } from '@chakra-ui/react';

interface LinkList {
  link?: string;
  title: string;
}

const BreadCrumb = ({linkList}: {linkList: LinkList[]}) => {
  return (
    <Text>
      {linkList.map(({link, title}, index) => {
        if(link){
          if(index === 0){
            return <Link href={link}>{title}</Link>;
          }else{
            return (
              <>
              / <Link href={link}>{title}</Link>
              </>
              );
          }
        }else{
          return <Text>{title}</Text>
        }
      })}
    </Text>
  )
};

export default BreadCrumb;
