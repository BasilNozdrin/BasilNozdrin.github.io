#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main()
{
    char **text = NULL;
    int dopsa_counter = 0;
    char next_char;
    int text_len = 0;
    do
    {
	text = realloc(text, text_len + sizeof(*char));
	char *next_sentece = NULL;
	int sentence_len = 0;
	do
	{
	    char next_char = getc(stdin);
            next_sentence =  realloc(next_sentence, sentence_len + sizeof(char));
	    next_sentence[sentence_len] = next_char;
            sentence_len++;
	} while ((next_char == '.')||(next_char == '!')||(next_char == '?')||(next_char == EOF));
	if 
    } while (/*sentence != the END*/);
    print("Too much DOPSA AAAA (%d)", dopsa_counter);
    return 0;
}
